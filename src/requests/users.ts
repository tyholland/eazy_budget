import { UserResponse } from "../types";

const api = process.env.REACT_APP_API;

export const createUser = async (
  accessToken: string,
  userInfo: UserResponse,
) => {
  try {
    const budgetResponse = await fetch(`${api}/user/create`, {
      method: "POST",
      body: JSON.stringify({ ...userInfo }),
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-type": "application/json",
      },
    });

    return await budgetResponse.json();
  } catch (err) {
    throw new Error(`Failed to get budget info`);
  }
};

export const deleteUser = async (accessToken: string) => {
  try {
    const budgetResponse = await fetch(`${api}/user/remove`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return await budgetResponse.json();
  } catch (err) {
    throw new Error(`Failed to get budget info`);
  }
};
