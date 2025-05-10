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
  const subscribe =
    currentUser &&
    (currentUser.subscription_id >= 3 || currentUser.subscription_id === 1);

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
      {getSubscriptionStatus("Starter", currentUser?.subscription_id) && (
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
