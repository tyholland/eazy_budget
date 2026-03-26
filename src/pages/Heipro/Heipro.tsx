import React, { ChangeEvent, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { getClientDetails } from "../../requests/heipro.ts";
import { trackError } from "../../functions/mixpanel.ts";
import * as S from "./heipro.style.ts";

const Heipro = () => {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [industry, setIndustry] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [business, setBusiness] = useState<string>("");
  const { getAccessTokenSilently } = useAuth0();

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const accessToken = await getAccessTokenSilently({
        authorizationParams: {
          audience: process.env.REACT_APP_AUDIENCE,
        },
      });

      const hasIndustry = !!industry.length;
      const hasBusiness = !!business;
      const hasBoth = hasIndustry && hasBusiness;

      const res = await getClientDetails(
        accessToken,
        hasBoth
          ? `${industry} + ${business}`
          : hasIndustry
            ? industry
            : business,
        `${city} + ${state}`,
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

  const industries = [
    "Consulting",
    "Healthcare",
    "Dental",
    "Construction",
    "Photography",
    "Beauty & Wellness",
    "Finance & Insurance",
    "Legal",
    "Media & Entertainment",
    "Non-Profit",
    "Hospitality, Tourism, and Recreation",
    "Food & Beverage",
    "Fashion & Apparel",
    "Lodging",
    "Sports & Recreation",
    "Home Improvement",
    "Retail",
    "Education",
    "Information Technology",
    "Real Estate & Property ",
    "Residential Care",
    "Digital Products",
    "Entertainment & Leisure",
    "Transportation & Logistics",
    "Agriculture, Forestry & Fishing",
    "Artificial Intelligence",
    "Telecommunications",
    "Utilities",
    "E-commerce & Online Retail",
    "Wholesale & Distribution",
    "Manufacturing",
    "Government & Public Administration",
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

  return (
    <div>
      <h1>HeiPro Lead Engine</h1>

      <div>
        <S.SearchWrapper>
          <S.Select onChange={(e) => setSelectField("industry", e)}>
            <option value="">Select Industry</option>
            {industries.map((item) => (
              <option value={item}>{item}</option>
            ))}
          </S.Select>
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
              <option value={item}>{item}</option>
            ))}
          </S.Select>
        </S.SearchWrapper>
        <div></div>
        <S.Button
          onClick={fetchLeads}
          disabled={!isIndustryActive && !isBusinessActive}
        >
          Find Weak Marketing Leads
        </S.Button>
      </div>

      {loading && <p>Loading...</p>}

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
                <strong>Score:</strong> {lead.score} / 100
              </div>
              <div>
                <strong>Homepage Issues:</strong> {lead.issues}
              </div>
              <div>
                <strong>Services to Recommend:</strong> {lead.services}
              </div>
            </S.Card>
          ))}
      </S.CardWrapper>
    </div>
  );
};

export default Heipro;
