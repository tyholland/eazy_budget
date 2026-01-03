import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import * as S from "./login.style.ts";
import Loading from "../../components/Loading/Loading.tsx";
import { useNavigate } from "react-router-dom";
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
            width="600px"
            height="220px"
            alt="pain points"
            className="spreadsheet"
          />
          <div className="solution">
            <img
              src="/images/homepage/control.png"
              width="250px"
              height="180px"
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
      <S.Section className="steps">
        <h2>
          <span className="bold">Three steps. That's it</span>
        </h2>
        <S.Steps>
          <div className="section">
            <img
              src="/images/homepage/create.png"
              width="350px"
              height="230px"
              alt="Add your income & expenses"
            />
            <div className="stepSection">
              <div className="number">1</div>
              <div>Add your income & expenses</div>
            </div>
          </div>
          <div className="section">
            <img
              src="/images/homepage/financial-picture.png"
              width="350px"
              height="230px"
              alt="See your full financial breakdown"
            />
            <div className="stepSection">
              <div className="number">2</div>
              <div>See your full financial picture</div>
            </div>
          </div>
          <div className="section">
            <img
              src="/images/homepage/progress.png"
              width="350px"
              height="230px"
              alt="Track your progress"
            />
            <div className="stepSection">
              <div className="number">3</div>
              <div>Track your progress</div>
            </div>
          </div>
        </S.Steps>
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
          Start Your Free Budget
        </Button>
      </S.Section>
      <S.SplitSection>
        <img
          src="/images/homepage/when-you-know.png"
          width="600px"
          height="390px"
          alt="when you know where your money goes"
          className="money"
        />
        <S.Section className="steps">
          <h2>
            <span className="bold">Start free. Upgrade</span> anytime.
          </h2>
          <S.Upgrade>
            <S.BulletSection>
              <div className="bullet">
                <SaveIcon /> Expense Tracking
              </div>
              <div className="bullet">
                <SaveIcon /> Goal Setting
              </div>
              <div className="bullet">
                <SaveIcon /> Multi-Currency
              </div>
              <div className="bullet">
                <SaveIcon /> No Credit Card Needed
              </div>
            </S.BulletSection>
            <img
              src="/images/homepage/graph.png"
              width="300px"
              height="200px"
              alt="bar graph"
            />
          </S.Upgrade>
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
            Sign Up Free
          </Button>
        </S.Section>
      </S.SplitSection>
    </S.Wrapper>
  );
};

export default Login;
