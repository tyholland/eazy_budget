import React from "react";
import Input from "../Input/Input.tsx";
import Button from "../Button/Button.tsx";
import { listOfMonths } from "../../constants.ts";

interface OverviewProps {
  label?: string;
  showLabel?: boolean;
}

const Overview = ({ label, showLabel = true }: OverviewProps) => {
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

  return (
    <div>
      {showLabel && <div>{label}</div>}
      <Input
        inputLabel={income}
        defaultValue={30.0}
        type="number"
        inputOption="income"
      />
      <Input
        inputLabel={expense}
        defaultValue={20.0}
        type="number"
        inputOption="expense"
      />
      <Input inputLabel={remaining} defaultValue={10.0} type="number" />
      {isYearly && (
        <div>
          <div>Predict your cash flow for the next 5 years</div>
          <Button handleClick={() => {}}>Next</Button>
        </div>
      )}
    </div>
  );
};

export default Overview;
