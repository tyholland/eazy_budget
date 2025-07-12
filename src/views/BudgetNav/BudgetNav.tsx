import React from "react";
import * as S from "./budgetNav.style.ts";
import Button from "../../components/Button/Button.tsx";
import { useNavigate, useParams } from "react-router-dom";
import { trackEvent } from "../../functions/mixpanel.ts";

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
  const params = useParams();

  return (
    <S.NavWrapper>
      <S.NavItem className={selectedOption === "income" ? "open" : "close"}>
        <Button
          classType="text"
          handleClick={() => {
            setSelectedOption("income");
            trackEvent('Viewed Income', {
              month: params.month,
              year: params.year
            });
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
            trackEvent('Viewed Expense', {
              month: params.month,
              year: params.year
            });
            navigate(expenseUrl);
          }}
        >
          Expense
        </Button>
      </S.NavItem>
      <S.NavItem className={selectedOption === "details" ? "open" : "close"}>
        <Button
          classType="text"
          handleClick={() => {
            setSelectedOption("details");
            trackEvent('Viewed Details', {
              month: params.month,
              year: params.year
            });
          }}
        >
          Details
        </Button>
      </S.NavItem>
      <S.NavItem className={selectedOption === "charts" ? "open" : "close"}>
        <Button
          classType="text"
          handleClick={() => {
            setSelectedOption("charts");
            trackEvent('Viewed Charts', {
              month: params.month,
              year: params.year
            });
          }}
        >
          Charts
        </Button>
      </S.NavItem>
    </S.NavWrapper>
  );
};

export default BudgetNav;
