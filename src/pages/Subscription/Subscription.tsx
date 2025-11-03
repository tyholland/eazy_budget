import React, { useEffect } from "react";
import * as S from "./subscription.style.ts";
import PricingDetails from "../../views/PricingDetails/PricingDetails.tsx";
import { useAtomValue } from "jotai";
import { userAtom } from "../../hook/UserAtom.ts";
import { useNavigate } from "react-router-dom";
import {
  getSubscriptionStatus,
  loggedInHomepage,
} from "../../functions/helper.ts";

const Subscription = () => {
  const currentUser = useAtomValue(userAtom);
  const navigate = useNavigate();

  useEffect(() => {
    if (
      currentUser &&
      !getSubscriptionStatus("Starter", currentUser?.subscription_id)
    ) {
      navigate(loggedInHomepage(currentUser));
    }
  }, []);

  return (
    <>
      <S.Title>Subscription Details</S.Title>
      <PricingDetails isHighlighted />
    </>
  );
};

export default Subscription;
