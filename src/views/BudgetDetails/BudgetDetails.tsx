import React from "react";
import * as S from "./budgetDetails.style.ts";
import BudgetInput from "../../components/BudgetInput/BudgetInput.tsx";
import { getSubscriptionStatus } from "../../functions/helper.ts";
import { useAtomValue } from "jotai";
import { userAtom } from "../../hook/UserAtom.ts";
import { getMonthlyPaidExpenses } from "../../functions/budget.ts";
import { budgetAtom } from "../../hook/BudgetAtom.ts";

interface BudgetDetailsProps {
  income: number;
  expense: number;
  month?: string;
  year?: number;
}

const BudgetDetails = ({
  income,
  expense,
  month,
  year,
}: BudgetDetailsProps) => {
  const currentUser = useAtomValue(userAtom);
  const budget = useAtomValue(budgetAtom);
  const cashFlow = income - expense;
  const expenseToIncome = ((expense / income) * 100).toFixed(2);
  const paidExpenses =
    month && year ? getMonthlyPaidExpenses(budget, month, year) : 0;
  const incomeMinusExpense = income - paidExpenses;

  return (
    <S.Wrapper>
      <S.TotalBudgetWrapper>
        <BudgetInput
          inputLabel={`Total income`}
          defaultValue={income}
          type="number"
          inputOption="income"
        />
      </S.TotalBudgetWrapper>
      <S.TotalBudgetWrapper>
        <BudgetInput
          inputLabel={`Total expenses`}
          defaultValue={expense}
          type="number"
          inputOption="expense"
        />
      </S.TotalBudgetWrapper>
      <S.TotalBudgetWrapper>
        <BudgetInput
          inputLabel={`Total remaining cash`}
          defaultValue={cashFlow}
          type="number"
        />
      </S.TotalBudgetWrapper>
      {getSubscriptionStatus("Starter", currentUser?.subscription_id) && (
        <S.TotalBudgetWrapper>
          <BudgetInput
            inputLabel="Income after paid expenses"
            defaultValue={incomeMinusExpense}
            type="number"
          />
        </S.TotalBudgetWrapper>
      )}
      {getSubscriptionStatus("Pro", currentUser?.subscription_id) && (
        <S.TotalBudgetWrapper>
          <BudgetInput
            inputLabel="Expense to Income Ratio"
            defaultValue={expenseToIncome}
            type="number"
            percent
          />
        </S.TotalBudgetWrapper>
      )}
    </S.Wrapper>
  );
};

export default BudgetDetails;
