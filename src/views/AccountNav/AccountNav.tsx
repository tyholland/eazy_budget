import React from "react";
import * as S from "./accountNav.style.ts";
import Button from "../../components/Button/Button.tsx";
import { getSubscriptionStatus } from "../../functions/helper.ts";
import { useAtomValue } from "jotai";
import { userAtom } from "../../hook/UserAtom.ts";
import { useNavigate } from "react-router-dom";

interface AccountNavProps {
  setSelectedOption: (val: string) => void;
  selectedOption: string;
}

const AccountNav = ({ setSelectedOption, selectedOption }: AccountNavProps) => {
  const currentUser = useAtomValue(userAtom);
  const navigate = useNavigate();
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
      {currentUser?.medal_game && (
        <S.NavItem
          className={`${subscribe ? "subscribe" : ""} ${selectedOption === "medal" ? "open" : "close"}`}
        >
          <Button
            classType="text"
            handleClick={() => {
              setSelectedOption("medal");
              navigate("?nav=medal");
            }}
          >
            Medal
          </Button>
        </S.NavItem>
      )}
      {currentUser?.hasBudget && (
        <S.NavItem
          className={`${subscribe ? "subscribe" : ""} ${selectedOption === "budget" ? "open" : "close"}`}
        >
          <Button
            classType="text"
            handleClick={() => {
              setSelectedOption("budget");
              navigate("?nav=budget");
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
              navigate("?nav=admin");
            }}
          >
            Admin
          </Button>
        </S.NavItem>
      )}
      {subscribe && currentUser?.hasBudget && (
        <S.NavItem
          className={`subscribe ${selectedOption === "plan" ? "open" : "close"}`}
        >
          <Button
            classType="text"
            handleClick={() => {
              setSelectedOption("plan");
              navigate("?nav=plan");
            }}
          >
            Plan
          </Button>
        </S.NavItem>
      )}
      <S.NavItem
        className={`${subscribe ? "subscribe" : ""} ${selectedOption === "settings" ? "open" : "close"}`}
      >
        <Button
          classType="text"
          handleClick={() => {
            setSelectedOption("settings");
            navigate("?nav=settings");
          }}
        >
          Settings
        </Button>
      </S.NavItem>
    </S.NavWrapper>
  );
};

export default AccountNav;
