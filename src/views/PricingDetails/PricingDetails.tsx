import React from "react";
import * as S from "./pricingDetails.style.ts";
import { useAuth0 } from "@auth0/auth0-react";
import Button from "../../components/Button/Button.tsx";
import { useAtom } from "jotai";
import { userAtom } from "../../hook/UserAtom.ts";
import { getSubscriptionStatus } from "../../functions/helper.ts";
import { updateUserSub } from "../../requests/users.ts";
import { trackError } from "../../functions/mixpanel.ts";
import Loading from "../../components/Loading/Loading.tsx";
import PaypalBtn from "../../components/PaypalBtn/PaypalBtn.tsx";

interface PricingDetailsProps {
  isSignUp?: boolean;
  isPayPal?: boolean;
  isUpgrade?: boolean;
  isHighlighted?: boolean;
  isSelectedPlan?: string | null;
}

const PricingDetails = ({
  isSignUp = false,
  isPayPal = false,
  isUpgrade = false,
  isHighlighted = false,
  isSelectedPlan,
}: PricingDetailsProps) => {
  const { loginWithRedirect, getAccessTokenSilently, isLoading } = useAuth0();
  const [currentUser, setCurrentUser] = useAtom(userAtom);
  const isOriginal = getSubscriptionStatus("OG", currentUser?.subscription_id);
  const isTester = getSubscriptionStatus(
    "Tester",
    currentUser?.subscription_id,
  );
  const isReferrals = getSubscriptionStatus(
    "Referral",
    currentUser?.subscription_id,
  );
  const foreverFree = isOriginal || isTester || isReferrals;
  const isPro =
    getSubscriptionStatus("Pro", currentUser?.subscription_id) && !foreverFree;
  const isStarter =
    getSubscriptionStatus("Starter", currentUser?.subscription_id) &&
    !foreverFree &&
    !isPro;
  const isFree = !foreverFree && !isStarter && !isPro;
  const isSelected = isSelectedPlan
    ? isSelectedPlan
    : currentUser
      ? currentUser.subscription_id || 2
      : null;
  const notComplete =
    !!currentUser && !currentUser.paid_sub && !currentUser.paypal_sub_id;

  const isSelectedStarter = isSelected === 3 || isSelected === 6;
  const isSelectedPro =
    isSelected === 1 ||
    isSelected === 4 ||
    isSelected === 5 ||
    isSelected === 7;

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
      trackError("PricingDeltails - updateSubscription:", { result: err });
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <S.Wrapper>
      <S.Container
        className={`${
          isFree && isHighlighted
            ? "highlight"
            : isSelected === 2
              ? "highlight"
              : ""
        } ${(isPayPal || isUpgrade) && "paypal"}`}
      >
        <S.Title>Free Plan</S.Title>
        <S.Price>
          <span>Price:</span> $0/month
        </S.Price>
        <div>Perfect for getting started with basic budgeting.</div>
        {isPayPal && (
          <S.SubscribeBtn className="paypal">
            <Button
              handleClick={() => updateSubscription(2, false)}
              buttonSize="medium"
            >
              Switch to Free
            </Button>
          </S.SubscribeBtn>
        )}
        {isUpgrade && (
          <S.SubscribeBtn className="paypal">
            <Button buttonSize="medium" disabled={isSelected === 2}>
              Current Plan
            </Button>
          </S.SubscribeBtn>
        )}
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
      </S.Container>
      <S.Container
        className={`${
          isStarter && isHighlighted
            ? "highlight"
            : isSelectedStarter
              ? "highlight"
              : ""
        } ${(isPayPal || isUpgrade) && "paypal"}`}
      >
        <S.Title>Starter Plan</S.Title>
        <S.Price>
          <span>Price:</span> $10/month
        </S.Price>
        <div>
          For users who want enhanced control and a more streamlined experience.
        </div>
        {isPayPal && (
          <S.SubscribeBtn className="paypal">
            {isSelectedStarter && !notComplete ? (
              <Button buttonSize="medium" disabled={isSelectedStarter}>
                Current Plan
              </Button>
            ) : (
              <PaypalBtn
                sub="P-4UE89663UT051505WNCZW36A"
                addSub={updateSubscription}
                planNum={3}
              />
            )}
          </S.SubscribeBtn>
        )}
        {isUpgrade && (
          <S.SubscribeBtn className="paypal">
            <PaypalBtn
              sub="P-4UE89663UT051505WNCZW36A"
              addSub={updateSubscription}
              planNum={3}
            />
          </S.SubscribeBtn>
        )}
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
      </S.Container>
      <S.Container
        className={`${
          (isPro || isOriginal) && isHighlighted
            ? "highlight"
            : isSelectedPro
              ? "highlight"
              : ""
        } ${(isPayPal || isUpgrade) && "paypal"}`}
      >
        <S.Title>Pro Plan</S.Title>
        <S.Price>
          <span>Price:</span> $20/month
        </S.Price>
        <div>
          For advanced users who need more customization, flexibility, and
          sharing options.
        </div>
        {isPayPal && (
          <S.SubscribeBtn className="paypal">
            {isSelectedPro && !notComplete ? (
              <Button buttonSize="medium" disabled={isSelectedPro}>
                Current Plan
              </Button>
            ) : (
              <PaypalBtn
                sub="P-0U075029M3838631HNCZ3PQI"
                addSub={updateSubscription}
                planNum={4}
              />
            )}
          </S.SubscribeBtn>
        )}
        {isUpgrade && (
          <S.SubscribeBtn className="paypal">
            <PaypalBtn
              sub="P-0U075029M3838631HNCZ3PQI"
              addSub={updateSubscription}
              planNum={4}
            />
          </S.SubscribeBtn>
        )}
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
      </S.Container>
    </S.Wrapper>
  );
};

export default PricingDetails;
