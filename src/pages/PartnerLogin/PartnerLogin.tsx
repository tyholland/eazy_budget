import React from "react";
import * as S from "./partnerLogin.style.ts";
import Button from "../../components/Button/Button.tsx";
import { useAuth0 } from "@auth0/auth0-react";

const PartnerLogin = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <S.Container>
      <S.Title>Partner - Pro Plan</S.Title>
      <S.Price>
        <span>Price:</span> Free
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
                returnTo: `/overview?plan=8`,
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
    </S.Container>
  );
};

export default PartnerLogin;
