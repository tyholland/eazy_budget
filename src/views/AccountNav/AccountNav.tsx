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
  const partnerAdmin = getSubscriptionStatus(
    "Admin",
    currentUser?.subscription_id,
  );

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
      {partnerAdmin && (
        <S.NavItem
          className={`${subscribe ? "subscribe" : ""} ${selectedOption === "admin" ? "open" : "close"}`}
        >
          <Button
            classType="text"
            handleClick={() => {
              setSelectedOption("admin");
            }}
          >
            Admin
          </Button>
        </S.NavItem>
      )}
      {subscribe && currentUser?.hasBudget && (
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
