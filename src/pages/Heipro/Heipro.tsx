import React, { ChangeEvent, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { getClientDetails } from "../../requests/heipro.ts";
import { trackError } from "../../functions/mixpanel.ts";

const Heipro = () => {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [industry, setIndustry] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const { getAccessTokenSilently } = useAuth0();

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const accessToken = await getAccessTokenSilently({
        authorizationParams: {
          audience: process.env.REACT_APP_AUDIENCE,
        },
      });

      const res = await getClientDetails(accessToken, industry, city);

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
      setIndustry(e.target.value);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>HeiPro Lead Engine</h1>

      <input
        type="text"
        placeholder="Enter industry"
        onChange={(e) => setInputField("industry", e)}
      />
      <input
        type="text"
        placeholder="Enter city"
        onChange={(e) => setInputField("city", e)}
      />
      <button onClick={fetchLeads}>Find Weak Marketing Leads</button>

      {loading && <p>Loading...</p>}

      <table cellPadding="10" style={{ marginTop: "20px" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Website</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Score</th>
            <th>Issues</th>
            <th>Services</th>
          </tr>
        </thead>
        <tbody>
          {leads &&
            leads.map((lead, index) => (
              <tr key={index}>
                <td>{lead.name}</td>
                <td>
                  <a href={lead.website} target="_blank" rel="noreferrer">
                    Visit
                  </a>
                </td>
                <td>{lead.email}</td>
                <td>{lead.phone}</td>
                <td>{lead.score}</td>
                <td>{lead.issues}</td>
                <td>{lead.services}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Heipro;
