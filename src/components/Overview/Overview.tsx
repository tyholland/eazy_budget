import React from "react";
import Input from "../Input/Input.tsx";
import Button from "../Button/Button.tsx";
import { listOfMonths } from "../../constants.ts";
import * as S from "./overview.style.ts";

interface OverviewProps {
  incomeValue: number;
  expenseValue: number;
  label?: string;
  showLabel?: boolean;
}

const Overview = ({
  label,
  showLabel = true,
  incomeValue,
  expenseValue,
}: OverviewProps) => {
  const date = new Date();
  const year = date.getFullYear();
  const month = listOfMonths[date.getMonth()];
  const isYearly = label === "Yearly";
  const isMonthly = label === "Monthly";
  const income = isYearly
    ? `${year} Income`
    : isMonthly
      ? `${month} Income`
      : "Total Income";
  const expense = isYearly
    ? `${year} Expenses`
    : isMonthly
      ? `${month} Expenses`
      : "Total Expenses";
  const remaining = isYearly
    ? `${year} Remaining Cash`
    : isMonthly
      ? `${month} Remaining Cash`
      : "Total Remaining Cash";
  const cashFlow = incomeValue - expenseValue;

  return (
    <S.OverviewWrapper>
      {showLabel && <S.Title>{label}</S.Title>}
      <Input
        inputLabel={income}
        defaultValue={incomeValue}
        type="number"
        inputOption="income"
      />
      <Input
        inputLabel={expense}
        defaultValue={expenseValue}
        type="number"
        inputOption="expense"
      />
      <Input inputLabel={remaining} defaultValue={cashFlow} type="number" />
      {isYearly && (
        <S.Prediction>
          <div>Predict your cash flow for the next 3 years</div>
          <Button handleClick={() => {}} buttonSize="medium">
            Predict Now
          </Button>
        </S.Prediction>
      )}
    </S.OverviewWrapper>
  );
};

export default Overview;
