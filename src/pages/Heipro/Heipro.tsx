import React, { ChangeEvent, useState } from "react";
import {
  getClientDetails,
  getSpecificLeadDetails,
} from "../../requests/heipro.ts";
import { trackError } from "../../functions/mixpanel.ts";
import * as S from "./heipro.style.ts";
import ModalComponent from "../../components/Modal/Modal.tsx";
import Button from "../../components/Button/Button.tsx";

type Lead = {
  email: string;
  score: number;
  issues: string;
  services: string;
  tech: string;
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

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const hasIndustry = !!industry.length;
      const hasBusiness = !!business;
      const hasBoth = hasIndustry && hasBusiness;

      const res = await getClientDetails(
        hasBoth ? `${industry} ${business}` : hasIndustry ? industry : business,
        `${city} ${state}`,
      );

      setLeads(res);
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

  const industries = [
    "Consulting",
    "Healthcare",
    "Dental",
    "Construction",
    "Photography",
    "Beauty and Wellness",
    "Finance and Insurance",
    "Legal",
    "Media and Entertainment",
    "Non-Profit",
    "Hospitality, Tourism, and Recreation",
    "Food and Beverage",
    "Fashion and Apparel",
    "Lodging",
    "Sports and Recreation",
    "Home Improvement",
    "Retail",
    "Education",
    "Information Technology",
    "Real Estate and Property ",
    "Residential Care",
    "Digital Products",
    "Entertainment and Leisure",
    "Transportation and Logistics",
    "Agriculture, Forestry and Fishing",
    "Artificial Intelligence",
    "Telecommunications",
    "Utilities",
    "E-commerce and Online Retail",
    "Wholesale and Distribution",
    "Manufacturing",
    "Government and Public Administration",
  ];

  const states = [
    "AL",
    "AK",
    "AZ",
    "AR",
    "CA",
    "CO",
    "CT",
    "DE",
    "FL",
    "GA",
    "HI",
    "ID",
    "IL",
    "IN",
    "IA",
    "KS",
    "KY",
    "LA",
    "ME",
    "MD",
    "MA",
    "MI",
    "MN",
    "MS",
    "MO",
    "MT",
    "NE",
    "NV",
    "NH",
    "NJ",
    "NM",
    "NY",
    "NC",
    "ND",
    "OH",
    "OK",
    "OR",
    "PA",
    "RI",
    "SC",
    "SD",
    "TN",
    "TX",
    "UT",
    "VT",
    "VA",
    "WA",
    "WV",
    "WI",
    "WY",
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
          <div>or</div>
          <S.Input
            type="text"
            placeholder="Enter Business Name"
            onChange={(e) => setInputField("business", e)}
          />
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
        <S.Button onClick={fetchLeads} disabled={count < 3}>
          Find Weak Marketing Leads
        </S.Button>
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
                  <strong>Phone:</strong> {lead.phone}
                </div>
                <S.Button onClick={() => getLeadDetails(lead.website)}>
                  View Details
                </S.Button>
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
