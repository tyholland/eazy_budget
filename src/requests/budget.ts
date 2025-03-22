const api = process.env.REACT_APP_API;

export const getBudget = async (
  accessToken: string,
  user_id: string | undefined,
) => {
  if (!user_id) {
    throw new Error(`Failed, you need a user_id`);
  }

  try {
    const budgetResponse = await fetch(`${api}/budget/${user_id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return await budgetResponse.json();
  } catch (err) {
    throw new Error(`Failed to get budget info for auth0|${user_id}`);
  }
};
