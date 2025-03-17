import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Button from "../../components/Button/Button.tsx";
import * as S from "./login.style.ts";

const Login = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <S.Wrapper>
      <div>
        Tired of using pen and paper to fill out your monthly expenses for each
        and every single month?
      </div>
      <div>
        Try Eazy Budgeting and dynamically have your expenses populated for each
        month.
      </div>
      <Button handleClick={() => loginWithRedirect()} buttonSize="medium">
        Log In / Sign Up
      </Button>
    </S.Wrapper>
  );
};

export default Login;
