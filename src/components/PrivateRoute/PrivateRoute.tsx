import React, { useEffect, useState } from "react";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import Loading from "../Loading/Loading.tsx";
import { getBudget } from "../../requests/budget.ts";
import { useAtom, useSetAtom } from "jotai";
import { budgetAtom } from "../../hook/BudgetAtom.ts";
import { createUser } from "../../requests/users.ts";
import { UserResponse } from "../../types.ts";
import { userAtom } from "../../hook/UserAtom.ts";

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
        const userResponse: UserResponse =
          user.email && (await createUser(accessToken, { email: user.email }));
        setCurrentUser({
          ...user,
          hasBudget: userResponse.hasBudget,
        });
        setHasBudget(userResponse.hasBudget);
      }
    } catch (err) {
      console.error(err);
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
      console.error(err);
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
