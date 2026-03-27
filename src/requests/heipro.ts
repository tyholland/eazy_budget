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
