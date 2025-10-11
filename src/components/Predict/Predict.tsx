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
            If you have a specific financial goal in mind, simply enter your
            target amount along with any existing savings. Our tool will
            automatically calculate how many years and months it will take to
            reach your goal based on the income and expenses already in your
            account. It will also show you the exact amount you need to save
            each month to stay on track.
          </span>
        </S.Content>
        <S.PredictInputs>
          <Input
            label="goalAmount"
            labelValue="Goal Amount:"
            placeHolder="Enter amount"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setGoalAmount(Number(e.target.value))
            }
          />
          <Input
            label="currentSavings"
            labelValue="Current Savings:"
            placeHolder="Enter savings"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setCurrentSavings(Number(e.target.value))
            }
          />
        </S.PredictInputs>
      </S.HeaderWrapper>
      <S.PredictBudgets>
        <div>
          <span>Total Years:</span> {goalAmount > 0 ? yearsToGoal : 0}
        </div>
        <div>
          <span>Total Months:</span> {goalAmount > 0 ? monthsRemaining : 0}
        </div>
        <div>
          <span>Amount to save per Month:</span>{" "}
          {goalAmount > 0 ? monthlySavings : formatAmount(0, "USD")}
        </div>
      </S.PredictBudgets>
    </S.PredictWrapper>
  );
};

export default Predict;
