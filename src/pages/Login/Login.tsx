import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Button from "../../components/Button/Button.tsx";
import * as S from "./login.style.ts";
import PenPaperIcon from "../../svg/PenPaperIcon.tsx";
import DataIcon from "../../svg/DataIcon.tsx";

const Login = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <S.Wrapper>
      <S.Section>
        <PenPaperIcon />
        <span>
          Tired of using pen and paper to fill out your monthly expenses for
          each and every single month?
        </span>
      </S.Section>
      <S.Section>
        <span>
          Eazy Budgeting will make your budgeting life easier. Just enter your
          expenses once, and they'll be dynamically added to each month of the
          year.
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
