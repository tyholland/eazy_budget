import React from "react";
import * as S from "./pricing.style.ts";
import PricingDetails from "../../views/PricingDetails/PricingDetails.tsx";
import { useAtomValue } from "jotai";
import { userAtom } from "../../hook/UserAtom.ts";
import { getSubscriptionStatus } from "../../functions/helper.ts";

const Pricing = () => {
  const currentUser = useAtomValue(userAtom);
  const isOriginal = getSubscriptionStatus("OG", currentUser?.subscription_id);
  const isTester = getSubscriptionStatus(
    "Tester",
    currentUser?.subscription_id,
  );
  const foreverFree = isOriginal || isTester;
  const isPro =
    getSubscriptionStatus("Pro", currentUser?.subscription_id) && !foreverFree;
  const isStarter =
    getSubscriptionStatus("Starter", currentUser?.subscription_id) &&
    !foreverFree &&
    !isPro;

  return (
    <>
      {!currentUser && <S.Title>Subscription Pricing</S.Title>}
      {!!currentUser && !currentUser.hasBudget && (
        <S.Section>
          Kindly select and complete payment for your preferred subscription
          plan. Alternatively, feel free to choose any option that best fits
          your needs.
        </S.Section>
      )}
      {!!currentUser && currentUser.hasBudget && (
        <S.Section>
          Kindly select a new subscription plan to switch your account to.
        </S.Section>
      )}
      <PricingDetails
        isSignUp={!currentUser}
        isPayPal={
          !!currentUser && (isStarter || isPro) && !currentUser.paypal_sub_id
        }
        isUpgrade={!!currentUser && currentUser.subscription_id === 2}
      />
    </>
  );
};

export default Pricing;
