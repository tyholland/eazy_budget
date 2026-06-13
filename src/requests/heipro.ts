import { EmailBlock } from "../types";

const api = process.env.REACT_APP_API;

export const getClientDetails = async (industry: string, city: string) => {
  try {
    const clientResponse = await fetch(
      `${api}/heipro?query=${industry}&location=${city}`,
      {
        method: "GET",
      },
    );

    return await clientResponse.json();
  } catch (err) {
    throw new Error(`Failed to get client data`);
  }
};

export const getSpecificLeadDetails = async (url: string) => {
  try {
    const leadResponse = await fetch(`${api}/heipro/details?url=${url}`, {
      method: "GET",
    });

    return await leadResponse.json();
  } catch (err) {
    throw new Error(`Failed to get lead details`);
  }
};

export const getMultiLeadDetails = async (urlArr: string[]) => {
  try {
    const multiResponse = await fetch(`${api}/heipro/multi`, {
      method: "POST",
      body: JSON.stringify({ urlArr }),
      headers: {
        "Content-type": "application/json",
      },
    });

    return await multiResponse.json();
  } catch (err) {
    throw new Error(`Failed to get multi client details`);
  }
};

export const sendEmail = async (msg: EmailBlock) => {
  try {
    const emailResponse = await fetch(`${api}/heipro/send-email`, {
      method: "POST",
      body: JSON.stringify({ msg }),
      headers: {
        "Content-type": "application/json",
      },
    });

    return await emailResponse.json();
  } catch (err) {
    throw new Error(`Failed to send email`);
  }
};
