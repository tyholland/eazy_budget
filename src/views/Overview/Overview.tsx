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
  hideViewIcon?: boolean;
}

const Overview = ({
  label,
  showLabel = true,
  incomeValue,
  expenseValue,
  hideViewIcon = false,
}: OverviewProps) => {
  const { currentYear, currentMonth } = getDateInfo();
  const isYearly = label === "Yearly";
  const isMonthly = label === "Monthly";
  const income = isYearly
    ? `${currentYear} Income`
    : isMonthly
      ? `${currentMonth} Income`
      : "Total Income";
  const expense = isYearly
    ? `${currentYear} Expenses`
    : isMonthly
      ? `${currentMonth} Expenses`
      : "Total Expenses";
  const remaining = isYearly
    ? `${currentYear} Remaining Cash`
    : isMonthly
      ? `${currentMonth} Remaining Cash`
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
        {!hideViewIcon && (
          <span data-tooltip-id={`${label}-income-tooltip`}>
            <a
              href={`/monthly/income/${currentMonth}`}
              aria-label="view income"
            >
              <ViewIcon />
            </a>
          </span>
        )}
      </S.Section>
      <S.Section>
        <Input
          inputLabel={expense}
          defaultValue={expenseValue}
          type="number"
          inputOption="expense"
        />
        {!hideViewIcon && (
          <span data-tooltip-id={`${label}-expense-tooltip`}>
            <a
              href={`/monthly/expense/${currentMonth}`}
              aria-label="view expenses"
            >
              <ViewIcon />
            </a>
          </span>
        )}
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
      {!hideViewIcon && (
        <>
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
        </>
      )}
    </S.OverviewWrapper>
  );
};

export default Overview;
