import React from "react";
import * as S from './subscription.style.ts';
import PricingDetails from "../../views/PricingDetails/PricingDetails.tsx";

const Subscription = () => {
  return (
    <>
      <S.Title>Subscription Details</S.Title>
      <PricingDetails hasBtn={false} isHighlighted />
    </>
  );
};

export default Subscription;
