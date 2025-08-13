import { User } from "@auth0/auth0-spa-js";
import { getBudget } from "../requests/budget.ts";
import { trackError, trackIdentity } from "./mixpanel.ts";
import { Auth0ContextInterface } from "@auth0/auth0-react";
import { UserResponse, User as CurrentUser } from "../types.ts";
import { createUser } from "../requests/users.ts";

export const addUser = async (
  auth: Auth0ContextInterface<User>,
  setCurrentUser: (val: CurrentUser) => void,
  setHasBudget: (val: boolean) => void,
) => {
  const { getAccessTokenSilently, user } = auth;

  try {
    const accessToken = await getAccessTokenSilently({
      authorizationParams: {
        audience: process.env.REACT_APP_AUDIENCE,
      },
    });

    if (user) {
      const params = new URLSearchParams(window.location.search);
      const plan = params.get("plan");

      const userResponse: UserResponse =
        user.email &&
        (await createUser(accessToken, {
          email: user.email,
          plan: Number(plan) || 2,
        }));

      setCurrentUser({
        ...user,
        hasBudget: userResponse.hasBudget,
        subscription_id: userResponse.subscription_id,
        connected_message: userResponse.connected_message,
        connected_id: userResponse.connected_id,
        primary_request: userResponse.primary_request,
        is_connected: userResponse.is_connected,
        categories: userResponse.categories,
        shared_account_email: userResponse.shared_account_email,
        paid_sub: userResponse.paid_sub,
        created_at: userResponse.created_at,
      });
      setHasBudget(userResponse.hasBudget);
      trackIdentity(userResponse.subscription_id, user.sub, user.email);
    }
  } catch (err) {
    trackError("PrivateRoute - AddUser:", { result: err });
  }
};

export const getBudgetInfo = async (
  setBudget: (val: any) => void,
  auth: Auth0ContextInterface<User>,
) => {
  try {
    const accessToken = await auth.getAccessTokenSilently({
      authorizationParams: {
        audience: process.env.REACT_APP_AUDIENCE,
      },
    });

    const response = await getBudget(accessToken);

    setBudget(response.budget);
  } catch (err) {
    trackError("PrivateRoute - getBudgetInfo:", { result: err });
  }
};
