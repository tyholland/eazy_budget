import React from "react";
import * as S from "./pricing.style.ts";
import PricingDetails from "../../views/PricingDetails/PricingDetails.tsx";
import { useAtomValue } from "jotai";
import { userAtom } from "../../hook/UserAtom.ts";

const Pricing = () => {
  const currentUser = useAtomValue(userAtom);

  return (
    <>
      {!currentUser && <S.Title>Subscription Pricing</S.Title>}
      {!!currentUser && (
        <S.Section>
          Kindly select and complete payment for your preferred subscription
          plan. Alternatively, feel free to choose any option that best fits
          your needs.
        </S.Section>
      )}
      {!!currentUser && currentUser.hasBudget && (
        <S.Section>
          Kindly select a new subscription plan to add to your account.
        </S.Section>
      )}
      <PricingDetails
        isSignUp={!currentUser}
        isPayPal={!!currentUser}
        isUpgrade={!!currentUser && currentUser.hasBudget}
      />
    </>
  );
};

export default Pricing;
