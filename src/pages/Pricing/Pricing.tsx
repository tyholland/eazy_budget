import React from "react";
import * as S from "./pricing.style.ts";
import PricingDetails from "../../views/PricingDetails/PricingDetails.tsx";

const Pricing = () => {
  return (
    <>
      <S.Title>Subscription Pricing</S.Title>
      <PricingDetails />
    </>
  );
};

export default Pricing;
