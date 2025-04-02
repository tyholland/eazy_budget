import React from "react";
import * as S from "./budgetNav.style.ts";
import { useAtomValue } from "jotai";
import { userAtom } from "../../hook/UserAtom.ts";
import Button from "../../components/Button/Button.tsx";
import { viewOptions } from "../../constants.ts";

interface BudgetNavProps {
  setSelectedOption: (val: string) => void;
  setSelectedType: (val: string) => void;
  setSelectedView: (val: string) => void;
  selectedOption?: string;
}

const BudgetNav = ({
  setSelectedOption,
  setSelectedType,
  setSelectedView,
  selectedOption,
}: BudgetNavProps) => {
  return (
    <S.NavWrapper>
      <S.NavItem className={selectedOption === "income" ? "open" : "close"}>
        <Button
          classType="text"
          handleClick={() => {
            setSelectedOption("income");
            setSelectedType("income");
          }}
        >
          Income
        </Button>
      </S.NavItem>
      <S.NavItem className={selectedOption === "expense" ? "open" : "close"}>
        <Button
          classType="text"
          handleClick={() => {
            setSelectedOption("expense");
            setSelectedType("expense");
          }}
        >
          Expense
        </Button>
      </S.NavItem>
      <S.NavItem className={selectedOption === "details" ? "open" : "close"}>
        <Button
          classType="text"
          handleClick={() => setSelectedOption("details")}
        >
          Details
        </Button>
      </S.NavItem>
      <S.NavItem className={selectedOption === "charts" ? "open" : "close"}>
        <Button
          classType="text"
          handleClick={() => {
            setSelectedOption("charts");
            setSelectedView(viewOptions[0].label);
          }}
        >
          Charts
        </Button>
      </S.NavItem>
    </S.NavWrapper>
  );
};

export default BudgetNav;
