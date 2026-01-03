import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import * as S from "./login.style.ts";
import Loading from "../../components/Loading/Loading.tsx";
import { useNavigate } from "react-router-dom";
import Link from "../../components/Link/Link.tsx";
import { loggedInHomepage } from "../../functions/helper.ts";
import Button from "../../components/Button/Button.tsx";
import SaveIcon from "../../svg/SaveIcon.tsx";

const Login = () => {
  const { loginWithRedirect, isLoading, user } = useAuth0();
  const navigate = useNavigate();

  if (isLoading) {
    return <Loading isText />;
  }

  if (user) {
    navigate(loggedInHomepage(undefined));
  }

  return (
    <S.Wrapper>
      <S.Section>
        <S.Catchphrase>
          <h1>Budgeting that actually fits your life.</h1>
          <div className="subText">
            Understand your money, build better habits, reach your goals
          </div>
          <Button
            handleClick={() =>
              loginWithRedirect({
                authorizationParams: {
                  screen_hint: "signup",
                },
              })
            }
            buttonSize="medium"
          >
            Get Started Free
          </Button>
        </S.Catchphrase>
        <img
          src="/images/homepage/header.png"
          width="500px"
          height="300px"
          alt="laptop and iphone of the monthly expense page"
          className="device"
        />
      </S.Section>
      <S.Section className="complicated">
        <h2>
          <span className="bold">Most budget fail</span> because they're too
          complicated
        </h2>
        <S.PainPoint>
          <img
            src="/images/homepage/spreadsheets.png"
            width="580px"
            height="200px"
            alt="pain points"
            className="spreadsheet"
          />
          <div className="solution">
            <img
              src="/images/homepage/charts.png"
              width="315px"
              height="196px"
              alt="solutions"
            />
            <S.BulletSection>
              <div className="bullet">
                <SaveIcon /> Simple Dashboard
              </div>
              <div className="bullet">
                <SaveIcon /> Clear insights
              </div>
              <div className="bullet">
                <SaveIcon /> In control
              </div>
            </S.BulletSection>
          </div>
        </S.PainPoint>
        <div className="ending">
          <strong>Simple Budgeting</strong> was built to change that
        </div>
      </S.Section>
    </S.Wrapper>
  );
};

export default Login;
