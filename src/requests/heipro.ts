const api = process.env.REACT_APP_API;

export const getClientDetails = async (
  accessToken: string,
  industry: string,
  city: string,
) => {
  try {
    const clientResponse = await fetch(
      `${api}/heipro?query=${industry}&location=${city}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-type": "application/json",
        },
      },
    );

    return await clientResponse.json();
  } catch (err) {
    throw new Error(`Failed to get client data`);
  }
};
