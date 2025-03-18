import React from "react";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import Loading from "../Loading/Loading.tsx";

const PrivateRoute = ({ component, ...args }) => {
  const { isLoading } = useAuth0();
  const Component = withAuthenticationRequired(component, args);

  return isLoading ? <Loading /> : <Component />;
};

export default PrivateRoute;
