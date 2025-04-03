import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Button from "../../components/Button/Button.tsx";
import * as S from "./login.style.ts";
import PenPaperIcon from "../../svg/PenPaperIcon.tsx";
import DataIcon from "../../svg/DataIcon.tsx";
import Loading from "../../components/Loading/Loading.tsx";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { loginWithRedirect, isLoading, user } = useAuth0();
  const navigate = useNavigate();

  if (isLoading) {
    return <Loading />;
  }

  if (user) {
    navigate("/overview");
  }

  return (
    <S.Wrapper>
      <S.Section>
        <PenPaperIcon />
        <span>
          Tired of using pen and paper to track your monthly expenses every
          single month?
        </span>
      </S.Section>
      <S.Section>
        <span>
          Eazy Budgeting makes budgeting effortless—just enter your expenses
          once, and they'll be automatically applied to each month of the year.
        </span>
        <DataIcon />
      </S.Section>
      <Button handleClick={() => loginWithRedirect()} buttonSize="medium">
        Log In / Sign Up
      </Button>
    </S.Wrapper>
  );
};

export default Login;
