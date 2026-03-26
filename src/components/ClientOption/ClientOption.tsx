import React, { useState } from "react";
import * as S from "./clientOption.style.ts";
import Button from "../../components/Button/Button.tsx";
import { useAuth0 } from "@auth0/auth0-react";
import SessionExpired from "../../components/SessionExpired/SessionExpired.tsx";

const ClientOption = () => {
  const { loginWithRedirect } = useAuth0();
  const [isSessionExpired, setIsSessionExpired] = useState<boolean>(false);

  return (
    <S.Container>
      <S.Wrapper>
        <div>
          <S.Title>Client - Pro Plan</S.Title>
          <S.Price>
            <span>Price:</span> <span className="strike">$20/month</span>{" "}
            $15/month
          </S.Price>
          <S.Price>
            <span>Partner Discount:</span> 25%{" "}
            <span className="discount">(already included)</span>
          </S.Price>
        </div>
        <div>
          <S.SubscribeBtn>
            <Button
              handleClick={() =>
                loginWithRedirect({
                  appState: {
                    returnTo: `/setup?plan=9`,
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
        </div>
      </S.Wrapper>
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
                returnTo: `/setup?plan=9`,
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
      <SessionExpired
        isOpen={isSessionExpired}
        closeModal={setIsSessionExpired}
      />
    </S.Container>
  );
};

export default ClientOption;
