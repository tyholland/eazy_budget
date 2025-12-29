import React from "react";
import ClientOption from "../../components/ClientOption/ClientOption.tsx";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading/Loading.tsx";
import * as S from "./client.style.ts";
import ErrorPage from "../../views/ErrorPage/ErrorPage.tsx";
import { loggedInHomepage } from "../../functions/helper.ts";

const Client = () => {
  const { isLoading, user } = useAuth0();
  const navigate = useNavigate();
  const params = new URLSearchParams(window.location.search);
  const referral_code = params.get("referral");

  referral_code && localStorage.setItem("referral_code", referral_code);

  if (isLoading) {
    return <Loading isText />;
  }

  if (user) {
    navigate(loggedInHomepage(undefined));
  }

  if (!referral_code) {
    return (
      <S.Container>
        <S.Title>
          The referral link provided by your financial advisor is missing the
          referral code. Please request that your advisor include the referral
          code in the link.
        </S.Title>
        <ErrorPage />
      </S.Container>
    );
  }

  return <ClientOption />;
};

export default Client;
