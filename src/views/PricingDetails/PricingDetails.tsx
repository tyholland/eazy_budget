import React from "react";
import * as S from "./pricingDetails.style.ts";
import { useAuth0 } from "@auth0/auth0-react";
import Button from "../../components/Button/Button.tsx";
import { useAtomValue } from "jotai";
import { userAtom } from "../../hook/UserAtom.ts";
import { getSubscriptionStatus } from "../../functions/helper.ts";

interface PricingDetailsProps {
  hasBtn?: boolean;
  isHighlighted?: boolean;
}

const PricingDetails = ({
  hasBtn = true,
  isHighlighted = false,
}: PricingDetailsProps) => {
  const { loginWithRedirect } = useAuth0();
  const currentUser = useAtomValue(userAtom);

  const isOriginal = getSubscriptionStatus("OG", currentUser?.subscription_id);
  const isPro =
    getSubscriptionStatus("Pro", currentUser?.subscription_id) && !isOriginal;
  const isStarter =
    getSubscriptionStatus("Starter", currentUser?.subscription_id) &&
    !isOriginal &&
    !isPro;

  return (
    <S.Wrapper>
      <S.Container>
        <S.Title>Free Plan</S.Title>
        <S.Price>
          <span>Price:</span> $0/month
        </S.Price>
        <div>Perfect for getting started with basic budgeting.</div>
        <ul>
          <li>Create a full-year budget by entering income and expenses</li>
          <li>Edit existing income and expense entries at any time</li>
          <li>Add additional income and expenses as needed</li>
          <li>
            Visualize your financial data with bar, doughnut, and pie charts
          </li>
          <li>Access to the 3-Year Financial Forecasting Tool</li>
        </ul>
        {hasBtn && (
          <Button handleClick={loginWithRedirect} buttonSize="medium">
            Sign Up
          </Button>
        )}
      </S.Container>
      <S.Container className={isStarter && isHighlighted ? "highlight" : ""}>
        <S.Title>Starter Plan</S.Title>
        <S.Price>
          <span>Price:</span> $10/month
        </S.Price>
        <div>
          For users who want enhanced control and a more streamlined experience.
        </div>
        <ul>
          <li>Everything included in the Free Plan</li>
          <li>
            <span>Ad-free experience</span>
          </li>
          <li>Sort and organize income and expenses for easier tracking</li>
          <li>
            View real-time monthly income adjustments as expenses are paid
          </li>
          <li>
            Get a quick snapshot of previous months within the current year
          </li>
        </ul>
        {hasBtn && (
          <Button handleClick={loginWithRedirect} buttonSize="medium">
            Sign Up
          </Button>
        )}
      </S.Container>
      <S.Container
        className={(isPro || isOriginal) && isHighlighted ? "highlight" : ""}
      >
        <S.Title>Pro Plan</S.Title>
        <S.Price>
          <span>Price:</span> $20/month
        </S.Price>
        <div>
          For advanced users who need more customization, flexibility, and
          sharing options.
        </div>
        <ul>
          <li>Everything included in the Starter Plan</li>
          <li>
            Download your full budget as an Excel spreadsheet for external use
            or backup
          </li>
          <li>Set custom cadences when entering income or expenses</li>
          <li>Create and filter expenses by personalized categories for clearer financial insights and smarter budgeting</li>
          <li>
            Additional frequency options: <span>Quarterly</span> and{" "}
            <span>Yearly</span>
          </li>
          <li>Share account access with one additional user</li>
        </ul>
        {hasBtn && (
          <Button handleClick={loginWithRedirect} buttonSize="medium">
            Sign Up
          </Button>
        )}
      </S.Container>
    </S.Wrapper>
  );
};

export default PricingDetails;
