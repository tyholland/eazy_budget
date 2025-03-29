import React from "react";
import BudgetInput from "../../components/BudgetInput/BudgetInput.tsx";
import * as S from "./overview.style.ts";
import ViewIcon from "../../svg/ViewIcon.tsx";
import ChartIcon from "../../svg/ChartIcon.tsx";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { getDateInfo } from "../../functions/helper.ts";
import Link from "../../components/Link/Link.tsx";

interface OverviewProps {
  incomeValue: number;
  expenseValue: number;
  label?: string;
  showLabel?: boolean;
  hideViewIcon?: boolean;
  hidePredict?: boolean;
}

const Overview = ({
  label,
  showLabel = true,
  incomeValue,
  expenseValue,
  hideViewIcon = false,
  hidePredict = false,
}: OverviewProps) => {
  const { currentYear, currentMonth } = getDateInfo();
  const isYearly = label === "Yearly";
  const isMonthly = label === "Monthly";
  const incomeOptions = isMonthly ? `${currentMonth} Income` : "Total Income";
  const income = isYearly ? `${currentYear} Income` : incomeOptions;
  const expenseOptions = isMonthly
    ? `${currentMonth} Expenses`
    : "Total Expenses";
  const expense = isYearly ? `${currentYear} Expenses` : expenseOptions;
  const remainingOptions = isMonthly
    ? `${currentMonth} Remaining Cash`
    : "Total Remaining Cash";
  const remaining = isYearly
    ? `${currentYear} Remaining Cash`
    : remainingOptions;
  const cashFlow = incomeValue - expenseValue;
  const theDate = isYearly ? currentYear : currentMonth;
  const theYear = isMonthly ? `/${currentYear}` : "";

  return (
    <S.OverviewWrapper>
      {showLabel && <S.Title>{label}</S.Title>}
      <S.Section>
        <BudgetInput
          inputLabel={income}
          defaultValue={incomeValue}
          type="number"
          inputOption="income"
        />
        {!hideViewIcon && (
          <span data-tooltip-id={`${label}-income-tooltip`}>
            <Link
              url={`/${label?.toLowerCase()}/income/${theDate}${theYear}`}
              label="view income"
            >
              <ViewIcon />
            </Link>
          </span>
        )}
      </S.Section>
      <S.Section>
        <BudgetInput
          inputLabel={expense}
          defaultValue={expenseValue}
          type="number"
          inputOption="expense"
        />
        {!hideViewIcon && (
          <span data-tooltip-id={`${label}-expense-tooltip`}>
            <Link
              url={`/${label?.toLowerCase()}/expense/${theDate}${theYear}`}
              label="view expenses"
            >
              <ViewIcon />
            </Link>
          </span>
        )}
      </S.Section>
      <BudgetInput
        inputLabel={remaining}
        defaultValue={cashFlow}
        type="number"
      />
      {isYearly && !hidePredict && (
        <S.Prediction>
          <div>Predict cash flow for the next 3 years</div>
          <Link
            url="/predict"
            label="Predict"
            classType="button"
            linkSize="medium"
          >
            <>
              Predict <ChartIcon />
            </>
          </Link>
        </S.Prediction>
      )}
      {!hideViewIcon && (
        <>
          <ReactTooltip
            id={`${label}-expense-tooltip`}
            place="top"
            variant="info"
            content={`View a detailed breakdown of your expenses`}
            className="tooltip"
          />
          <ReactTooltip
            id={`${label}-income-tooltip`}
            place="top"
            variant="info"
            content={`View a detailed breakdown of your income`}
            className="tooltip"
          />
        </>
      )}
    </S.OverviewWrapper>
  );
};

export default Overview;
