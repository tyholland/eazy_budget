import React from "react";
import * as S from "./budgetDetails.style.ts";
import BudgetInput from "../../components/BudgetInput/BudgetInput.tsx";
import { getSubscriptionStatus } from "../../functions/helper.ts";
import { useAtomValue } from "jotai";
import { userAtom } from "../../hook/UserAtom.ts";

interface BudgetDetailsProps {
  income: number;
  expense: number;
}

const BudgetDetails = ({ income, expense }: BudgetDetailsProps) => {
  const currentUser = useAtomValue(userAtom);
  const cashFlow = income - expense;
  const expenseToIncome = ((expense / income) * 100).toFixed(2);

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
