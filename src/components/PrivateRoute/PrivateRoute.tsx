import React, { useEffect } from "react";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import Loading from "../Loading/Loading.tsx";
import { getBudget } from "../../requests/budget.ts";
import { useAtomValue } from "jotai";
import { budgetAtom } from "../../hook/BudgetAtom.ts";
import { createUser } from "../../requests/users.ts";
import { User } from "../../types.ts";

const PrivateRoute = ({ component, ...args }) => {
  const { isLoading, getAccessTokenSilently, user } = useAuth0();
  const budget = useAtomValue(budgetAtom);
  const Component = withAuthenticationRequired(component, args);

  const addUser = async () => {
    try {
      const accessToken = await getAccessTokenSilently({
        authorizationParams: {
          audience: process.env.REACT_APP_AUDIENCE,
        },
      });

      console.log(user);

      user?.email && (await createUser(accessToken, { email: user.email }));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    user && addUser();
  }, [user]);

  if (budget.length === 0) {
    (async () => {
      try {
        const accessToken = await getAccessTokenSilently({
          authorizationParams: {
            audience: process.env.REACT_APP_AUDIENCE,
          },
        });

        await getBudget(accessToken);
      } catch (err) {
        console.log(err);
      }
    })();
  }

  return isLoading ? <Loading /> : <Component />;
};

export default PrivateRoute;
