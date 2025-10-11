import React, { ChangeEvent, useState } from "react";
import * as S from "./predict.style.ts";
import { useAtomValue } from "jotai";
import { budgetAtom } from "../../hook/BudgetAtom.ts";
import { getYearlyTotalAmount } from "../../functions/budget.ts";
import Input from "../Input/Input.tsx";
import { formatAmount, getDateInfo } from "../../functions/helper.ts";

const Predict = () => {
  const budget = useAtomValue(budgetAtom);
  const { currentYear } = getDateInfo();
  const yearlyTotalIncome = getYearlyTotalAmount(budget, currentYear, "income");
  const yearlyTotalExpense = getYearlyTotalAmount(
    budget,
    currentYear,
    "expense",
  );
  const [goalAmount, setGoalAmount] = useState<number>(0);
  const [currentSavings, setCurrentSavings] = useState<number>(0);

  const annualSavings = yearlyTotalIncome - yearlyTotalExpense;
  const remainingGoal = goalAmount - currentSavings;
  const yearsToGoal = Math.ceil(remainingGoal / annualSavings);
  const monthsRemaining = yearsToGoal * 12;
  const monthlySavings = formatAmount(remainingGoal / monthsRemaining, "USD");

  return (
    <S.PredictWrapper>
      <S.HeaderWrapper>
        <S.Content>
          <span>
            This tool assumes you have an estimate of your expected income for
            the next three years.
          </span>
          <span>
            Enter your projected income to see your estimated remaining cash
            over that period.
          </span>
        </S.Content>
        <S.PredictInputs>
          <Input
            label="goalAmount"
            labelValue="Goal Amount:"
            placeHolder="Enter Goal Amount"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setGoalAmount(Number(e.target.value))
            }
          />
          <Input
            label="currentSavings"
            labelValue="Current Savings:"
            placeHolder="Enter Current Savings"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setCurrentSavings(Number(e.target.value))
            }
          />
        </S.PredictInputs>
      </S.HeaderWrapper>
      <S.PredictBudgets>
        <div>Years: {goalAmount > 0 && yearsToGoal}</div>
        <div>Monthly savings needed: {goalAmount > 0 && monthlySavings}</div>
      </S.PredictBudgets>
    </S.PredictWrapper>
  );
};

export default Predict;
