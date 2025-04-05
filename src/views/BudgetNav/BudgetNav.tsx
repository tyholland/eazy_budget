import React from "react";
import * as S from "./budgetNav.style.ts";
import Button from "../../components/Button/Button.tsx";
import { useNavigate } from "react-router-dom";

interface BudgetNavProps {
  setSelectedOption: (val: string) => void;
  incomeUrl: string;
  expenseUrl: string;
  selectedOption?: string;
}

const BudgetNav = ({
  setSelectedOption,
  incomeUrl,
  expenseUrl,
  selectedOption,
}: BudgetNavProps) => {
  const navigate = useNavigate();

  return (
    <S.NavWrapper>
      <S.NavItem className={selectedOption === "income" ? "open" : "close"}>
        <Button
          classType="text"
          handleClick={() => {
            setSelectedOption("income");
            navigate(incomeUrl);
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
            navigate(expenseUrl);
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
          }}
        >
          Charts
        </Button>
      </S.NavItem>
    </S.NavWrapper>
  );
};

export default BudgetNav;
