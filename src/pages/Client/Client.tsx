import React, { useState } from "react";
import * as S from "./client.style.ts";
import Button from "../../components/Button/Button.tsx";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading/Loading.tsx";
import PaypalBtn from "../../components/PaypalBtn/PaypalBtn.tsx";
import { trackError } from "../../functions/mixpanel.ts";
import { updateUserSub } from "../../requests/users.ts";
import { useAtom } from "jotai";
import { userAtom } from "../../hook/UserAtom.ts";
import SessionExpired from "../../components/SessionExpired/SessionExpired.tsx";
import { checkIsExpiredSession } from "../../functions/helper.ts";
import ErrorPage from "../../views/ErrorPage/ErrorPage.tsx";

const Client = () => {
  const { loginWithRedirect, isLoading, user, getAccessTokenSilently } =
    useAuth0();
  const navigate = useNavigate();
  const [isSessionExpired, setIsSessionExpired] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useAtom(userAtom);
  const params = new URLSearchParams(window.location.search);
  const referral_code = params.get("referral");

  referral_code && localStorage.setItem("referral_code", referral_code);

  // if (isLoading) {
  //   return <Loading />;
  // }

  // if (user) {
  //   navigate("/overview");
  // }

  const updateSubscription = async (
    plan: number,
    paid: boolean,
    sub_id?: string | null,
  ) => {
    try {
      const accessToken = await getAccessTokenSilently({
        authorizationParams: {
          audience: process.env.REACT_APP_AUDIENCE,
        },
      });

      currentUser &&
        setCurrentUser({
          ...currentUser,
          paid_sub: paid,
          subscription_id: plan,
          paypal_sub_id: sub_id,
          subscribed_at: new Date(Date.now()).toISOString(),
        });

      localStorage.removeItem("plan");
      localStorage.removeItem("referral_code");
      await updateUserSub(accessToken, {
        plan,
        paid,
        paypal_sub: sub_id,
      });
    } catch (err) {
      trackError("Client - updateSubscription:", { result: err });

      if (checkIsExpiredSession(err)) {
        setIsSessionExpired(true);
      }
    }
  };

  // if (!referral_code) {
  //   return (
  //     <S.Container>
  //       <S.Title>
  //         The referral link provided by your financial advisor is missing the
  //         referral code. Please request that your advisor include the referral
  //         code in the link.
  //       </S.Title>
  //       <ErrorPage />
  //     </S.Container>
  //   );
  // }

  return (
    <S.Container>
      <S.Title>Client - Pro Plan</S.Title>
      <S.Price>
        <span>Price:</span> $10/month
      </S.Price>
      <S.Price>
        <span>Partner Discount:</span> 50%
      </S.Price>
      <ul>
        <li>
          Create a full-year budget by manually entering income and expenses
        </li>
        <li>
          Import your income and expenses by uploading a CSV file to create a
          full-year budget
        </li>
        <li>Edit existing income and expense entries at any time</li>
        <li>Add additional income and expenses as needed</li>
        <li>
          Visualize your financial data with bar, doughnut, and pie charts
        </li>
        <li>
          Calculate how long it will take to reach your financial goal and how
          much you need to save each month
        </li>
        <li>
          <span>Ad-free experience</span>
        </li>
        <li>Sort and organize income and expenses for easier tracking</li>
        <li>View real-time monthly income adjustments as expenses are paid</li>
        <li>Get a quick snapshot of previous months within the current year</li>
        <li>
          Download your full budget as an Excel spreadsheet for external use or
          backup
        </li>
        <li>Set custom cadences when entering income or expenses</li>
        <li>
          Create and filter expenses by personalized categories for clearer
          financial insights and smarter budgeting
        </li>
        <li>
          Additional frequency options: <span>Quarterly</span> and{" "}
          <span>Yearly</span>
        </li>
        <li>Share account access with one additional user</li>
        <li>
          Easily switch between up to seven different currencies for flexible
          financial tracking
        </li>
      </ul>
      <S.SubscribeBtn>
        <Button
          handleClick={() =>
            loginWithRedirect({
              appState: {
                returnTo: `/overview?plan=9`,
              },
              authorizationParams: {
                screen_hint: "signup",
              },
            })
          }
          buttonSize="medium"
        >
          Sign Up
        </Button>
      </S.SubscribeBtn>
      <S.SubscribeBtn className="paypal">
        <PaypalBtn
          sub="P-4UE89663UT051505WNCZW36A"
          addSub={updateSubscription}
          planNum={9}
        />
      </S.SubscribeBtn>
      <SessionExpired
        isOpen={isSessionExpired}
        closeModal={setIsSessionExpired}
      />
    </S.Container>
  );
};

export default Client;
