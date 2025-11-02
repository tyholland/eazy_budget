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

export const getClientInfo = async (accessToken: string, client_id: number) => {
  try {
    const getClientResponse = await fetch(
      `${api}/referral/client/${client_id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-type": "application/json",
        },
      },
    );

    return await getClientResponse.json();
  } catch (err) {
    throw new Error(`Failed to get client info`);
  }
};

export const getClientBudgetInfo = async (
  accessToken: string,
  client_id: number,
) => {
  try {
    const getClientResponse = await fetch(
      `${api}/referral/budget/${client_id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-type": "application/json",
        },
      },
    );

    return await getClientResponse.json();
  } catch (err) {
    throw new Error(`Failed to get client info`);
  }
};

export const startTrialPlan = async (
  accessToken: string,
  updatedSub: Object,
) => {
  try {
    const startTrialResponse = await fetch(`${api}/referral/start`, {
      method: "PUT",
      body: JSON.stringify({ ...updatedSub }),
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-type": "application/json",
      },
    });

    return await startTrialResponse.json();
  } catch (err) {
    throw new Error(`Failed to start referral plan`);
  }
};
