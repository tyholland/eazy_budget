import React from "react";
import Input from "../../components/Input/Input.tsx";
import Button from "../../components/Button/Button.tsx";
import * as S from "./overview.style.ts";
import ViewIcon from "../../svg/ViewIcon.tsx";
import ChartIcon from "../../svg/ChartIcon.tsx";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { getDateInfo } from "../../functions/helper.ts";

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
  const { year, month } = getDateInfo();
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
      <S.Section>
        <Input
          inputLabel={income}
          defaultValue={incomeValue}
          type="number"
          inputOption="income"
        />
        <span data-tooltip-id={`${label}-income-tooltip`}>
          <ViewIcon />
        </span>
      </S.Section>
      <S.Section>
        <Input
          inputLabel={expense}
          defaultValue={expenseValue}
          type="number"
          inputOption="expense"
        />
        <span data-tooltip-id={`${label}-expense-tooltip`}>
          <ViewIcon />
        </span>
      </S.Section>
      <Input inputLabel={remaining} defaultValue={cashFlow} type="number" />
      {isYearly && (
        <S.Prediction>
          <div>Predict your cash flow for the next 3 years</div>
          <Button handleClick={() => {}} buttonSize="medium">
            <S.Predict>
              Predict <ChartIcon />
            </S.Predict>
          </Button>
        </S.Prediction>
      )}
      <ReactTooltip
        id={`${label}-expense-tooltip`}
        place="top"
        variant="info"
        content={`View a more detailed breakdown of your ${label?.toLowerCase()} expenses`}
      />
      <ReactTooltip
        id={`${label}-income-tooltip`}
        place="top"
        variant="info"
        content={`View a more detailed breakdown of your ${label?.toLowerCase()} income`}
      />
    </S.OverviewWrapper>
  );
};

export default Overview;
