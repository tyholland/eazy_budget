import React, { JSX } from "react";
import * as S from "./setupBudget.style.ts";
import Link from "../../components/Link/Link.tsx";
import DisabledSaveIcon from "../../svg/DisabledSaveIcon.tsx";
import SaveIcon from "../../svg/SaveIcon.tsx";
import { useAtomValue } from "jotai";
import { incomeAtom } from "../../hook/IncomeAtom.ts";
import { expenseAtom } from "../../hook/ExpenseAtom.ts";

interface SetupBudgetProps {
  children: JSX.Element;
  month: string;
  year: number;
}

const SetupBudget = ({ children, month, year }: SetupBudgetProps) => {
  const budgetIncome = useAtomValue(incomeAtom);
  const budgetExpense = useAtomValue(expenseAtom);

  return (
    <S.Wrapper>
      <S.ContentSection>
        <span>
          <strong>Welcome to Eazy Budgeting</strong>
        </span>
        <span>
          Enter your income and expenses to generate a complete 12-month budget.
        </span>
      </S.ContentSection>
      <S.Section>
        <Link
          url={`/add/income/${month}/${year}`}
          linkSize="medium"
          classType="button"
          label="Add income"
        >
          Add income
        </Link>{" "}
        {budgetIncome.length === 0 ? <DisabledSaveIcon /> : <SaveIcon />}
      </S.Section>
      <S.Section>
        <Link
          url={`/add/expense/${month}/${year}`}
          linkSize="medium"
          classType="button"
          label="Add expense"
        >
          Add expense
        </Link>{" "}
        {budgetExpense.length === 0 ? <DisabledSaveIcon /> : <SaveIcon />}
      </S.Section>
      {children}
    </S.Wrapper>
  );
};

export default SetupBudget;
