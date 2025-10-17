import React, { ChangeEvent, useEffect, useState } from "react";
import * as S from "./predict.style.ts";
import { useAtomValue } from "jotai";
import { budgetAtom } from "../../hook/BudgetAtom.ts";
import { getYearlyTotalAmount } from "../../functions/budget.ts";
import Input from "../Input/Input.tsx";
import { getDateInfo, getFormattedCurrency } from "../../functions/helper.ts";
import { userAtom } from "../../hook/UserAtom.ts";

const Predict = () => {
  const budget = useAtomValue(budgetAtom);
  const currentUser = useAtomValue(userAtom);
  const { currentYear } = getDateInfo();
  const [monthlySavings, setMontlySavings] = useState<string>("");
  const [goalCurrency, setGoalCurrency] = useState<string>("");
  const [savingsCurrency, setSavingsCurrency] = useState<string>("");
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
  const amount = remainingGoal / monthsRemaining;

  const savingsAmount = async () => {
    const { currencyValue, emptyValue } = await getFormattedCurrency(
      amount,
      currentUser,
    );

    const { currencyValue: goalValue, emptyValue: emptyGoal } =
      await getFormattedCurrency(goalAmount, currentUser);

    const { currencyValue: savingsValue, emptyValue: emptySavings } =
      await getFormattedCurrency(currentSavings, currentUser);

    setMontlySavings(goalAmount > 0 ? currencyValue : emptyValue);
    setGoalCurrency(goalAmount > 0 ? goalValue : emptyGoal);
    setSavingsCurrency(goalAmount > 0 ? savingsValue : emptySavings);
  };

  useEffect(() => {
    savingsAmount();
  }, [goalAmount, currentSavings]);

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
            labelValue="Goal Amount (USD):"
            placeHolder="Enter amount (USD)"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setGoalAmount(Number(e.target.value))
            }
          />
          {currentUser?.currency !== "USD" && (
            <S.CurrencyValue>
              Amount in ({currentUser?.currency}): {goalCurrency}
            </S.CurrencyValue>
          )}
          <Input
            label="currentSavings"
            labelValue="Current Savings (USD):"
            placeHolder="Enter savings (USD)"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setCurrentSavings(Number(e.target.value))
            }
          />
          {currentUser?.currency !== "USD" && (
            <S.CurrencyValue>
              Savings in ({currentUser?.currency}): {savingsCurrency}
            </S.CurrencyValue>
          )}
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
          <span>Amount to save per Month:</span> {monthlySavings}
        </div>
      </S.PredictBudgets>
    </S.PredictWrapper>
  );
};

export default Predict;
