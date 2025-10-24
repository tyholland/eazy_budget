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
      const referral_code = localStorage.getItem("referral_code");
      const plan = localStorage.getItem("plan");

      const userResponse: UserResponse =
        user.email &&
        (await createUser(accessToken, {
          email: user.email,
          referral_code: referral_code || undefined,
          plan: plan || undefined,
        }));

      setCurrentUser({
        ...user,
        ...userResponse,
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
