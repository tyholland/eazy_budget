import React from "react";
import { AppState, Auth0Provider } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

interface Auth0ProviderRedirectProps {
  children: JSX.Element;
}

const Auth0ProviderRedirect = ({ children }: Auth0ProviderRedirectProps) => {
  const navigate = useNavigate();

  const onRedirectCallback = (appState?: AppState) => {
    const target = (appState && appState.returnTo) || window.location.pathname;
    navigate(target);
  };

  return (
    <Auth0Provider
      onRedirectCallback={onRedirectCallback}
      domain={process.env.REACT_APP_DOMAIN as string}
      clientId={process.env.REACT_APP_CLIENT_ID as string}
      authorizationParams={{
        redirect_uri: `${window.location.origin}/overview`,
      }}
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderRedirect;
