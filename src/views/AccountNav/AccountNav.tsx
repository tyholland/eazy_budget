import React from "react";
import * as S from "./accountNav.style.ts";
import Button from "../../components/Button/Button.tsx";
import { getSubscriptionStatus } from "../../functions/helper.ts";
import { useAtomValue } from "jotai";
import { userAtom } from "../../hook/UserAtom.ts";

interface AccountNavProps {
  setSelectedOption: (val: string) => void;
  selectedOption: string;
}

const AccountNav = ({ setSelectedOption, selectedOption }: AccountNavProps) => {
  const currentUser = useAtomValue(userAtom);
  const subscribe = getSubscriptionStatus(
    "Starter",
    currentUser?.subscription_id,
  );
  const referralSub =
    currentUser &&
    currentUser.subscription_id !== 2 &&
    currentUser.subscription_id !== 1;

  return (
    <S.NavWrapper>
      <S.NavItem
        className={`${subscribe ? "subscribe" : ""} ${selectedOption === "settings" ? "open" : "close"}`}
      >
        <Button
          classType="text"
          handleClick={() => {
            setSelectedOption("settings");
          }}
        >
          Settings
        </Button>
      </S.NavItem>
      {currentUser?.hasBudget && (
        <S.NavItem
          className={`${subscribe ? "subscribe" : ""} ${selectedOption === "budget" ? "open" : "close"}`}
        >
          <Button
            classType="text"
            handleClick={() => {
              setSelectedOption("budget");
            }}
          >
            Budget
          </Button>
        </S.NavItem>
      )}
      {/* Add logic to show only if it has a budget and if a referral plan hasn't been selected */}
      {currentUser?.hasBudget && !referralSub && (
        <S.NavItem
          className={`${subscribe ? "subscribe" : ""} ${selectedOption === "referrals" ? "open" : "close"}`}
        >
          <Button
            classType="text"
            handleClick={() => {
              setSelectedOption("referrals");
            }}
          >
            Referrals
          </Button>
        </S.NavItem>
      )}
      {getSubscriptionStatus("Starter", currentUser?.subscription_id) &&
        currentUser?.hasBudget && (
          <S.NavItem
            className={`subscribe ${selectedOption === "subscription" ? "open" : "close"}`}
          >
            <Button
              classType="text"
              handleClick={() => setSelectedOption("subscription")}
            >
              Subscription
            </Button>
          </S.NavItem>
        )}
    </S.NavWrapper>
  );
};

export default AccountNav;
