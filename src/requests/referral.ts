const api = process.env.REACT_APP_API;

export const updateReferralName = async (
  accessToken: string,
  updatedSub: Object,
) => {
  try {
    const updateReferralResponse = await fetch(`${api}/referral/name`, {
      method: "PUT",
      body: JSON.stringify({ ...updatedSub }),
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-type": "application/json",
      },
    });

    return await updateReferralResponse.json();
  } catch (err) {
    throw new Error(`Failed to update referral name`);
  }
};
