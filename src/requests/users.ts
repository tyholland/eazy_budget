import { ConnectedDecisionRequest, UserRequest } from "../types";

const api = process.env.REACT_APP_API;

export const createUser = async (
  accessToken: string,
  userInfo: UserRequest,
) => {
  try {
    const userResponse = await fetch(`${api}/user/create`, {
      method: "POST",
      body: JSON.stringify({ ...userInfo }),
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-type": "application/json",
      },
    });

    return await userResponse.json();
  } catch (err) {
    throw new Error(`Failed to create user`);
  }
};

export const deleteUser = async (accessToken: string) => {
  try {
    const userResponse = await fetch(`${api}/user/remove`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-type": "application/json",
      },
    });

    return await userResponse.json();
  } catch (err) {
    throw new Error(`Failed to delete user`);
  }
};

export const shareAccount = async (
  accessToken: string,
  userInfo: UserRequest,
) => {
  try {
    const sharedResponse = await fetch(`${api}/user/share`, {
      method: "POST",
      body: JSON.stringify({ ...userInfo }),
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-type": "application/json",
      },
    });

    return await sharedResponse.json();
  } catch (err) {
    throw new Error(`Failed to share account`);
  }
};

export const shareAccountDecision = async (
  accessToken: string,
  userInfo: ConnectedDecisionRequest,
) => {
  try {
    const sharedResponse = await fetch(`${api}/user/share/decide`, {
      method: "POST",
      body: JSON.stringify({ ...userInfo }),
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-type": "application/json",
      },
    });

    return await sharedResponse.json();
  } catch (err) {
    throw new Error(`Failed to share account decision`);
  }
};

export const removeSharedAccount = async (accessToken: string) => {
  try {
    const removedShareResponse = await fetch(`${api}/user/share/remove`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-type": "application/json",
      },
    });

    return await removedShareResponse.json();
  } catch (err) {
    throw new Error(`Failed to remove shared account access`);
  }
};

export const updateUserSub = async (
  accessToken: string,
  updatedSub: Object,
) => {
  try {
    const userUpdateResponse = await fetch(`${api}/user/update/sub`, {
      method: "PUT",
      body: JSON.stringify({ ...updatedSub }),
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-type": "application/json",
      },
    });

    return await userUpdateResponse.json();
  } catch (err) {
    throw new Error(`Failed to update user sub`);
  }
};
