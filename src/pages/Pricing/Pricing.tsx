import React from "react";
import * as S from "./pricing.style.ts";
import PricingDetails from "../../views/PricingDetails/PricingDetails.tsx";
import { useAtomValue } from "jotai";
import { userAtom } from "../../hook/UserAtom.ts";

const Pricing = () => {
  const currentUser = useAtomValue(userAtom);

  return (
    <>
      <S.Title>Subscription Pricing</S.Title>
      <PricingDetails isSignUp={!currentUser} isPayPal={!!currentUser} />
    </>
  );
};

export default Pricing;
