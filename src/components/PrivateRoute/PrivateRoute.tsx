import React, { useEffect, useState } from "react";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import Loading from "../Loading/Loading.tsx";
import { getBudget } from "../../requests/budget.ts";
import { useAtom, useSetAtom } from "jotai";
import { budgetAtom } from "../../hook/BudgetAtom.ts";
import { createUser } from "../../requests/users.ts";
import { UserResponse } from "../../types.ts";
import { userAtom } from "../../hook/UserAtom.ts";
import { trackError, trackIdentity } from "../../functions/mixpanel.ts";

const PrivateRoute = ({ component, ...args }) => {
  const { isLoading, getAccessTokenSilently, user } = useAuth0();
  const setBudget = useSetAtom(budgetAtom);
  const [currentUser, setCurrentUser] = useAtom(userAtom);
  const [hasBudget, setHasBudget] = useState<boolean>(false);
  const Component = withAuthenticationRequired(component, args);

  const addUser = async () => {
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
        });
        setHasBudget(userResponse.hasBudget);
        trackIdentity(userResponse.subscription_id, user.sub, user.email);
      }
    } catch (err) {
      trackError("PrivateRoute - AddUser:", { result: err });
    }
  };

  const getBudgetInfo = async () => {
    try {
      const accessToken = await getAccessTokenSilently({
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

  useEffect(() => {
    if (!currentUser) {
      user && addUser();
    }
  }, [user]);

  useEffect(() => {
    if (hasBudget) {
      getBudgetInfo();
    }
  }, [hasBudget]);

  return isLoading ? <Loading /> : <Component />;
};

export default PrivateRoute;
