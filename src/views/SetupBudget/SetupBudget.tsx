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
  isDisabled: boolean;
}

const SetupBudget = ({
  children,
  month,
  year,
  isDisabled,
}: SetupBudgetProps) => {
  const budgetIncome = useAtomValue(incomeAtom);
  const budgetExpense = useAtomValue(expenseAtom);

  return (
    <S.Wrapper>
      <S.ContentSection>
        <h2>Welcome to Simple Budgeting</h2>
        <span>
          Enter your income and expenses to generate a complete 12-month budget.
        </span>
      </S.ContentSection>
      <S.SelectionWrapper>
        <img
          src="/images/create-account.jpg"
          width="350px"
          height="auto"
          alt="account settings and details"
        />
        <S.SectionWrapper>
          <S.Section>
            <Link
              url={`/add/income/${month}/${year}`}
              linkSize="medium"
              classType="button"
              label="Add income"
              isDisabled={isDisabled}
            >
              Add income
            </Link>{" "}
            {!budgetIncome.length ? <DisabledSaveIcon /> : <SaveIcon />}
          </S.Section>
          <S.Section>
            <Link
              url={`/add/expense/${month}/${year}`}
              linkSize="medium"
              classType="button"
              label="Add expense"
              isDisabled={isDisabled}
            >
              Add expense
            </Link>{" "}
            {!budgetExpense.length ? <DisabledSaveIcon /> : <SaveIcon />}
          </S.Section>
          {children}
        </S.SectionWrapper>
      </S.SelectionWrapper>
    </S.Wrapper>
  );
};

export default SetupBudget;
