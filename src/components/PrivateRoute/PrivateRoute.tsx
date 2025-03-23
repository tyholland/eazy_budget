import React, { useEffect, useState } from "react";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import Loading from "../Loading/Loading.tsx";
import { getBudget } from "../../requests/budget.ts";
import { useAtomValue } from "jotai";
import { budgetAtom } from "../../hook/BudgetAtom.ts";

const PrivateRoute = ({ component, ...args }) => {
  const { isLoading, getAccessTokenSilently } = useAuth0();
  const budget = useAtomValue(budgetAtom);
  const Component = withAuthenticationRequired(component, args);

  if (budget.length === 0) {
    (async () => {
      try {
        const accessToken = await getAccessTokenSilently({
          authorizationParams: {
            audience: process.env.REACT_APP_AUDIENCE,
            scope: "read:user",
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
