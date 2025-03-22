import React from "react";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import Loading from "../Loading/Loading.tsx";
import { getBudget } from "../../requests/budget.ts";

const PrivateRoute = ({ component, ...args }) => {
  const { isLoading, getAccessTokenSilently, user } = useAuth0();
  const user_id = user?.sub?.split("|")[1];
  const Component = withAuthenticationRequired(component, args);

  (async () => {
    try {
      const accessToken = await getAccessTokenSilently({
        authorizationParams: {
          audience: process.env.REACT_APP_AUDIENCE,
          scope: "read:user",
        },
      });

      await getBudget(accessToken, user_id);
    } catch (err) {
      console.log(err);
    }
  })();

  return isLoading ? <Loading /> : <Component />;
};

export default PrivateRoute;
