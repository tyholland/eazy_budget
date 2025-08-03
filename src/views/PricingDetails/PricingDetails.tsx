import React from "react";
import * as S from "./pricingDetails.style.ts";
import { useAuth0 } from "@auth0/auth0-react";
import Button from "../../components/Button/Button.tsx";
import { useAtom } from "jotai";
import { userAtom } from "../../hook/UserAtom.ts";
import { getSubscriptionStatus } from "../../functions/helper.ts";
import { updateUserSub } from "../../requests/users.ts";
import { trackError } from "../../functions/mixpanel.ts";

interface PricingDetailsProps {
  isSignUp?: boolean;
  isPayPal?: boolean;
  isUpgrade?: boolean;
  isHighlighted?: boolean;
}

const PricingDetails = ({
  isSignUp = false,
  isPayPal = false,
  isUpgrade = false,
  isHighlighted = false,
}: PricingDetailsProps) => {
  const { loginWithRedirect, getAccessTokenSilently } = useAuth0();
  const [currentUser, setCurrentUser] = useAtom(userAtom);
  const isOriginal = getSubscriptionStatus("OG", currentUser?.subscription_id);
  const isPro =
    getSubscriptionStatus("Pro", currentUser?.subscription_id) && !isOriginal;
  const isStarter =
    getSubscriptionStatus("Starter", currentUser?.subscription_id) &&
    !isOriginal &&
    !isPro;

  const isSelected = currentUser ? currentUser.subscription_id || 2 : null;

  const getSubscription = (sub: number) => {
    loginWithRedirect({
      appState: {
        returnTo: `/overview?plan=${sub}`,
      },
      authorizationParams: {
        screen_hint: "signup",
      },
    });
  };

  const updateSubscription = async (plan: number, paid: boolean) => {
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
        });

      await updateUserSub(accessToken, {
        plan,
        paid,
      });
    } catch (err) {
      trackError("PricingDeltails - updateSubscription:", { result: err });
    }
  };

  return (
    <S.Wrapper>
      <S.Container
        className={
          isStarter && isHighlighted
            ? "highlight"
            : isSelected === 2
              ? "highlight"
              : ""
        }
      >
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
        {isSignUp && (
          <S.SubscribeBtn>
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
              Sign Up
            </Button>
          </S.SubscribeBtn>
        )}
        {isPayPal && (
          <S.SubscribeBtn>
            <Button
              handleClick={() => updateSubscription(2, false)}
              buttonSize="medium"
              disabled={isUpgrade && isSelected === 2}
            >
              {isUpgrade ? "Switch" : "Free"}
            </Button>
          </S.SubscribeBtn>
        )}
      </S.Container>
      <S.Container
        className={
          isStarter && isHighlighted
            ? "highlight"
            : isSelected === 3
              ? "highlight"
              : ""
        }
      >
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
        {isSignUp && (
          <S.SubscribeBtn>
            <Button handleClick={() => getSubscription(3)} buttonSize="medium">
              Sign Up
            </Button>
          </S.SubscribeBtn>
        )}
        {isPayPal && (
          <S.SubscribeBtn className="paypal">
            <Button
              handleClick={() => {}}
              buttonSize="medium"
              disabled={isUpgrade && isSelected === 3}
            >
              {isUpgrade ? "Switch & Pay $10" : "Pay $10"}
            </Button>
          </S.SubscribeBtn>
        )}
      </S.Container>
      <S.Container
        className={
          (isPro || isOriginal) && isHighlighted
            ? "highlight"
            : isSelected === 4
              ? "highlight"
              : ""
        }
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
          <li>
            Create and filter expenses by personalized categories for clearer
            financial insights and smarter budgeting
          </li>
          <li>
            Additional frequency options: <span>Quarterly</span> and{" "}
            <span>Yearly</span>
          </li>
          <li>Share account access with one additional user</li>
        </ul>
        {isSignUp && (
          <S.SubscribeBtn>
            <Button handleClick={() => getSubscription(4)} buttonSize="medium">
              Sign Up
            </Button>
          </S.SubscribeBtn>
        )}
        {isPayPal && (
          <S.SubscribeBtn>
            <Button
              handleClick={() => {}}
              buttonSize="medium"
              disabled={isUpgrade && isSelected === 4}
            >
              {isUpgrade ? "Switch & Pay $20" : "Pay $20"}
            </Button>
          </S.SubscribeBtn>
        )}
      </S.Container>
    </S.Wrapper>
  );
};

export default PricingDetails;
