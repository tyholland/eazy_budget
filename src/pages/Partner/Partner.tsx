import React from "react";
import * as S from "./partner.style.ts";
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "../../components/Loading/Loading.tsx";
import Button from "../../components/Button/Button.tsx";

const Partner = () => {
  const { isLoading, user, loginWithRedirect } = useAuth0();

  if (isLoading) {
    return <Loading isText />;
  }

  return (
    <S.Wrapper>
      <S.Section>
        <S.Title>
          Partner with Simple Budgeting
          {!user && (
            <Button
              handleClick={() =>
                loginWithRedirect({
                  appState: {
                    returnTo: `/account?plan=8`,
                  },
                  authorizationParams: {
                    screen_hint: "signup",
                  },
                })
              }
              buttonSize="medium"
            >
              Join Now
            </Button>
          )}
        </S.Title>
      </S.Section>
      <S.Section>
        <S.SubTitle>
          Empower Your Clients. Simplify Your Workflow. Grow Together.
        </S.SubTitle>
        <div>
          The <strong>Simple Budgeting Partner Program</strong> is designed for
          financial advisors, coaches, and professionals who help clients take
          control of their finances. By partnering with us, you’ll gain the
          tools, visibility, and recurring income to guide clients toward
          smarter financial decisions — all in one intuitive platform.
        </div>
      </S.Section>
      <S.Section>
        <S.SubTitle>Partner Incentives</S.SubTitle>
        <div>
          <div className="secondaryTitle">
            <strong>Earn 25% Monthly Commission</strong>
          </div>
          Receive a <strong>25% recurring commission</strong> on every active
          client you onboard — month after month — after their 30-day free trial
          ends.
          <br />
          Your success grows as your clients thrive.
        </div>
        <div>
          <div className="secondaryTitle">
            <strong>Free Access to Simple Budgeting Pro</strong>
          </div>
          Partners receive <strong>complimentary access</strong> to the Simple
          Budgeting Pro Plan for their own use — giving you full access to every
          premium feature your clients will enjoy.
        </div>
        <div>
          <div className="secondaryTitle">
            <strong>25% Discount for Your Clients</strong>
          </div>
          Your clients receive <strong>25% off</strong> the Simple Budgeting Pro
          Plan, making it easier than ever for them to unlock the full power of
          budgeting while strengthening your advisory relationship.
        </div>
      </S.Section>
      <S.Section>
        <S.SubTitle>Partner Benefits</S.SubTitle>
        <div>
          <div className="secondaryTitle">
            <strong>Dedicated Admin Dashboard</strong>
          </div>
          Gain full visibility into your clients’ progress with a professional
          admin account that lets you:
          <ul>
            <li>View clients’ budgets in real time</li>
            <li>Track progress and habits</li>
            <li>Offer personalized guidance and accountability</li>
          </ul>
        </div>
        <div>
          <div className="secondaryTitle">
            <strong>Seamless Client Onboarding</strong>
          </div>
          Each partner receives a <strong>unique referral link</strong> for
          clients to sign up directly under your account. Clients are
          automatically added to your dashboard — no manual setup required.
        </div>
        <div>
          <div className="secondaryTitle">
            <strong>Flexible Data Entry Options</strong>
          </div>
          Your clients can add budget data however they prefer:
          <ul>
            <li>Upload a CSV file from Simple Budgeting, or</li>
            <li>Manually input income and expenses directly in the UI</li>
          </ul>
        </div>
      </S.Section>
      <S.Section>
        <S.SubTitle>Why Partner with Simple Budgeting</S.SubTitle>
        <ul>
          <li>Simplify client budget management and reporting</li>
          <li>Strengthen accountability and engagement</li>
          <li>Eliminate messy spreadsheets and manual tracking</li>
          <li>Help clients stay consistent with goals and spending</li>
          <li>Earn recurring income while expanding your service offerings</li>
          <li>
            Get hands-on experience with free Pro access to master the platform
            yourself
          </li>
        </ul>
      </S.Section>
      <S.Section>
        <S.SubTitle>Partner Incentives</S.SubTitle>
        <div>
          <div className="secondaryTitle">
            <strong>Trusted, Secure, and Advisor-Friendly</strong>
          </div>
          Simple Budgeting prioritizes privacy and security so you can
          confidently integrate it into your workflow.
          <br />
          We never share client data, and we do not provide investment or
          financial advice — that remains your expertise.
        </div>
      </S.Section>
      <S.Section className="last">
        <S.SubTitle>Start Your Partnership Today</S.SubTitle>
        <div>
          Join a growing community of financial professionals using Simple
          Budgeting to elevate client results, simplify workflows, and grow
          their practices.
          <br />
          Click below to get your unique referral dashboard, free Pro Plan
          access, and start onboarding clients this week.
        </div>
        {!user && (
          <div>
            <Button
              handleClick={() =>
                loginWithRedirect({
                  appState: {
                    returnTo: `/account?plan=8`,
                  },
                  authorizationParams: {
                    screen_hint: "signup",
                  },
                })
              }
              buttonSize="medium"
            >
              Become a Partner
            </Button>
          </div>
        )}
      </S.Section>
    </S.Wrapper>
  );
};

export default Partner;
