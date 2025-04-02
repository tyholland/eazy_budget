import React from "react";
import * as S from "./accountNav.style.ts";
import Button from "../../components/Button/Button.tsx";
import { getSubscriptionStatus } from "../../functions/helper.ts";

interface AccountNavProps {
  setSelectedOption: (val: string) => void;
  selectedOption: string;
  logout: () => void;
}

const AccountNav = ({
  setSelectedOption,
  selectedOption,
  logout,
}: AccountNavProps) => {
  return (
    <S.NavWrapper>
      <S.NavItem className={selectedOption === "settings" ? "open" : "close"}>
        <Button
          classType="text"
          handleClick={() => {
            setSelectedOption("settings");
          }}
        >
          Settings
        </Button>
      </S.NavItem>
      <S.NavItem className={selectedOption === "budget" ? "open" : "close"}>
        <Button
          classType="text"
          handleClick={() => {
            setSelectedOption("budget");
          }}
        >
          Budget
        </Button>
      </S.NavItem>
      {getSubscriptionStatus("Start") && (
        <S.NavItem
          className={selectedOption === "subscription" ? "open" : "close"}
        >
          <Button
            classType="text"
            handleClick={() => setSelectedOption("subscription")}
          >
            Subscription
          </Button>
        </S.NavItem>
      )}
      <S.NavItem className={selectedOption === "logout" ? "open" : "close"}>
        <Button
          classType="text"
          handleClick={() => {
            logout();
          }}
        >
          Logout
        </Button>
      </S.NavItem>
    </S.NavWrapper>
  );
};

export default AccountNav;
