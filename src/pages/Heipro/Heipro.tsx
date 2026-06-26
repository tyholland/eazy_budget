import React, { ChangeEvent, useEffect, useState } from "react";
import {
  getClientDetails,
  getMultiLeadDetails,
  getSpecificLeadDetails,
} from "../../requests/heipro.ts";
import { trackError } from "../../functions/mixpanel.ts";
import * as S from "./heipro.style.ts";
import ModalComponent from "../../components/Modal/Modal.tsx";
import Button from "../../components/Button/Button.tsx";
import CsvDownloadButton from "react-json-to-csv";

type Lead = {
  email: string;
  score: number;
  issues: string;
  services: string;
  tech: string;
  url?: string;
};

const Heipro = () => {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [modalLoading, setModalLoading] = useState<boolean>(false);
  const [industry, setIndustry] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [business, setBusiness] = useState<string>("");
  const [leadClient, setLeadClient] = useState<boolean>(false);
  const [leadData, setLeadData] = useState<Lead | undefined>(undefined);
  const [triggerLoad, setTriggerLoad] = useState<boolean>(false);
  const [allClientData, setAllClientData] = useState<Lead[] | undefined>(
    undefined,
  );

  const getCoordinates = async (city: string, state: string) => {
    const url = `https://nominatim.openstreetmap.org/search?city=${encodeURIComponent(
      city,
    )}&state=${encodeURIComponent(state)}&format=jsonv2&limit=1`;

    const response = await fetch(url, {
      headers: {
        "User-Agent": "MyApp/1.0 (your@email.com)",
      },
    });

    const results = await response.json();

    if (!results.length) return null;

    return {
      lat: results[0].lat,
      lon: results[0].lon,
    };
  };

  const searchBusinesses = async (
    city: string,
    state: string,
    tagValue: string,
  ) => {
    const coord = await getCoordinates(city, state);
    const radius = 10000;

    if (!coord) return null;

    const query = `
      [out:json][timeout:60];

      (
        node["${tagValue}"](around:${radius},${coord.lat},${coord.lon});
        way["${tagValue}"](around:${radius},${coord.lat},${coord.lon});
        relation["${tagValue}"](around:${radius},${coord.lat},${coord.lon});
      );

      out center tags;
    `;

    const response = await fetch("https://overpass-api.de/api/interpreter", {
      method: "POST",
      body: query,
    });

    const data = await response.json();
    const companies: any = [];

    data.elements.forEach((business: any) => {
      if (
        business.tags?.website &&
        (business.tags?.phone || business.tags?.email)
      ) {
        companies.push({
          id: business.id,
          name: business.tags?.name || "N/A",
          website: business.tags?.website || "N/A",
          phone: business.tags?.phone || "N/A",
          email: business.tags?.email || "N/A",
          address: [
            business.tags?.["addr:housenumber"],
            business.tags?.["addr:street"],
            business.tags?.["addr:city"],
            business.tags?.["addr:state"],
            business.tags?.["addr:postcode"],
          ]
            .filter(Boolean)
            .join(" "),
        });
      }
    });

    return companies;
  };

  const fetchLeads = async () => {
    setLoading(true);
    setAllClientData(undefined);
    try {
      const hasIndustry = !!industry.length;
      const hasBusiness = !!business;
      const hasBoth = hasIndustry && hasBusiness;

      const res = await searchBusinesses(
        city.toLowerCase(),
        state.toLocaleLowerCase(),
        industry.toLowerCase(),
      );

      if (!!res) {
        setLeads(res);
      }

      setLoading(false);
    } catch (err) {
      setLoading(false);
      trackError("Heipro - fetchLeads:", { result: err });
    }
  };

  const setInputField = (field: string, e: ChangeEvent<HTMLInputElement>) => {
    if (field === "city") {
      setCity(e.target.value);
    } else {
      setBusiness(e.target.value);
    }
  };

  const setSelectField = (field: string, e: ChangeEvent<HTMLSelectElement>) => {
    if (field === "industry") {
      setIndustry(e.target.value);
    } else {
      setState(e.target.value);
    }
  };

  const getLeadDetails = async (url: string) => {
    setModalLoading(true);
    setLeadClient(true);

    const res = await getSpecificLeadDetails(url);

    setLeadData(res);
    setModalLoading(false);
  };

  const getMultiLeads = async () => {
    try {
      setTriggerLoad(true);
      const allLeads: string[] = [];

      leads &&
        leads.forEach((item) => {
          allLeads.push(item.website);
        });

      const res = await getMultiLeadDetails(allLeads);

      setAllClientData(res);
      setTriggerLoad(false);
    } catch {
      setTriggerLoad(false);
    }
  };

  const industries = ["Amenity", "Office", "Craft", "Shop", "Tourism"];

  const states = [
    "Alabama",
    "Alaska",
    "Arizona",
    "Arkansas",
    "California",
    "Colorado",
    "Connecticut",
    "Delaware",
    "Florida",
    "Georgia",
    "Hawaii",
    "Idaho",
    "Illinois",
    "Indiana",
    "Iowa",
    "Kansas",
    "Kentucky",
    "Louisiana",
    "Maine",
    "Maryland",
    "Massachusetts",
    "Michigan",
    "Minnesota",
    "Mississippi",
    "Missouri",
    "Montana",
    "Nebraska",
    "Nevada",
    "New Hampshire",
    "New Jersey",
    "New Mexico",
    "New York",
    "North Carolina",
    "North Dakota",
    "Ohio",
    "Oklahoma",
    "Oregon",
    "Pennsylvania",
    "Rhode Island",
    "South Carolina",
    "South Dakota",
    "Tennessee",
    "Texas",
    "Utah",
    "Vermont",
    "Virginia",
    "Washington",
    "West Virginia",
    "Wisconsin",
    "Wyoming",
  ];

  const isIndustryActive = !!industry.length && !!city && !!state.length;
  const isBusinessActive = !!business && !!city && !!state.length;

  let count: number = 0;

  if (isIndustryActive) {
    count += 3;
  }

  if (isBusinessActive) {
    count += 3;
  }

  return (
    <div>
      <h1>Lead Generation Tool</h1>

      <div>
        <S.SearchWrapper>
          <S.Select onChange={(e) => setSelectField("industry", e)}>
            <option value="">Select Industry</option>
            {industries.map((item) => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
          </S.Select>
          {/* <div>or</div>
          <S.Input
            type="text"
            placeholder="Enter Business Name"
            onChange={(e) => setInputField("business", e)}
          /> */}
        </S.SearchWrapper>
        <S.SearchWrapper>
          <S.Input
            type="text"
            placeholder="Enter City"
            onChange={(e) => setInputField("city", e)}
          />
          <S.Select onChange={(e) => setSelectField("state", e)}>
            <option value="">Select State</option>
            {states.map((item) => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
          </S.Select>
        </S.SearchWrapper>
        <S.SearchWrapper>
          <S.Button onClick={fetchLeads} disabled={count < 3}>
            Find Marketing Leads
          </S.Button>
          {/* {!allClientData && (
            <S.Button
              onClick={getMultiLeads}
              disabled={!leads.length || triggerLoad}
            >
              Get Data for CSV
            </S.Button>
          )}
          {allClientData && (
            <CsvDownloadButton
              data={allClientData}
              headers={[
                "Email",
                "Score",
                "Issues",
                "Services",
                "Tech Stack",
                "URL",
              ]}
              filename="clientData"
            >
              Download CSV
            </CsvDownloadButton>
          )} */}
        </S.SearchWrapper>
      </div>

      {loading && <p>Loading...</p>}

      {!loading && (
        <S.CardWrapper>
          {leads &&
            leads.map((lead, index) => (
              <S.Card key={index}>
                <div>
                  <strong>Name:</strong> {lead.name}
                </div>
                <div>
                  <strong>Website:</strong>&nbsp;
                  <a href={lead.website} target="_blank" rel="noreferrer">
                    Visit
                  </a>
                </div>
                <div>
                  <strong>Email:</strong> {lead.email}
                </div>
                <div>
                  <strong>Phone:</strong> {lead.phone}
                </div>
                <div>
                  <strong>Address:</strong> {lead.address}
                </div>
                {/* <S.Button onClick={() => getLeadDetails(lead.website)}>
                  View Details
                </S.Button> */}
              </S.Card>
            ))}
          {!leads.length && <div>No Leads</div>}
        </S.CardWrapper>
      )}

      <ModalComponent isOpen={leadClient} title="Lead Details" size="medium">
        <>
          {modalLoading && <div>Still loading details...</div>}
          {!modalLoading && (
            <S.ModalWrapper>
              <div>
                <strong>Tech Stack:</strong> {leadData?.tech}
              </div>
              <div>
                <strong>Email:</strong> {leadData?.email}
              </div>
              <div>
                <strong>Score:</strong> {leadData?.score} / 100
              </div>
              <div>
                <strong>Homepage Issues:</strong> {leadData?.issues}
              </div>
              <div>
                <strong>Services to Recommend:</strong> {leadData?.services}
              </div>
            </S.ModalWrapper>
          )}
          <S.ModalBtn>
            <Button
              buttonSize="small"
              handleClick={() => setLeadClient(false)}
              classType="exit"
            >
              Close
            </Button>
          </S.ModalBtn>
        </>
      </ModalComponent>
    </div>
  );
};

export default Heipro;
