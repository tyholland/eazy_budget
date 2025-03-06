import React from "react";
import Overview from "../../views/Overview/Overview.tsx";
import * as S from "./home.style.ts";
import { useAtom, useAtomValue } from "jotai";
import { budgetAtom } from "../../hook/BudgetAtom.ts";
import { incomeAtom } from "../../hook/IncomeAtom.ts";
import { expenseAtom } from "../../hook/ExpenseAtom.ts";
import {
  createInitialBudget,
  getMonthlyTotalAmount,
  getYearlyTotalAmount,
} from "../../functions/budget.ts";
import { getDateInfo } from "../../functions/helper.ts";
import Button from "../../components/Button/Button.tsx";
import SaveIcon from "../../svg/SaveIcon.tsx";
import DisabledSaveIcon from "../../svg/DisabledSaveIcon.tsx";
import Link from "../../components/Link/Link.tsx";

const Home = () => {
  const [budget, setBudget] = useAtom(budgetAtom);
  const budgetIncome = useAtomValue(incomeAtom);
  const budgetExpense = useAtomValue(expenseAtom);
  const { currentYear, currentMonth } = getDateInfo();
  const montlyTotalIncome = getMonthlyTotalAmount(
    budget,
    currentMonth,
    currentYear,
    "income",
  );
  const monthlyTotalExpense = getMonthlyTotalAmount(
    budget,
    currentMonth,
    currentYear,
    "expense",
  );
  const yearlyTotalIncome = getYearlyTotalAmount(budget, currentYear, "income");
  const yearlyTotalExpense = getYearlyTotalAmount(
    budget,
    currentYear,
    "expense",
  );

  const handleBudgetSubmission = () => {
    setBudget(createInitialBudget(budgetIncome, budgetExpense));
  };

  return (
    <S.HomeWrapper>
      {budget.length > 0 && (
        <>
          <Overview
            label="Monthly"
            incomeValue={montlyTotalIncome}
            expenseValue={monthlyTotalExpense}
          />
          <Overview
            label="Yearly"
            incomeValue={yearlyTotalIncome}
            expenseValue={yearlyTotalExpense}
          />
        </>
      )}
      {budget.length === 0 && (
        <S.NoBudgetWrapper>
          <h2>You haven't entered any Budget info.</h2>
          <S.NoBudgetSection>
            <Link
              url={`/create/income/${currentMonth}/${currentYear}`}
              linkSize="medium"
              classType="button"
              label="Add income"
            >
              Add income
            </Link>{" "}
            {budgetIncome.length === 0 ? <DisabledSaveIcon /> : <SaveIcon />}
          </S.NoBudgetSection>
          <S.NoBudgetSection>
            <Link
              url={`/create/expense/${currentMonth}/${currentYear}`}
              linkSize="medium"
              classType="button"
              label="Add expense"
            >
              Add expense
            </Link>{" "}
            {budgetExpense.length === 0 ? <DisabledSaveIcon /> : <SaveIcon />}
          </S.NoBudgetSection>
          <S.SubmitBudget>
            <Button
              handleClick={handleBudgetSubmission}
              buttonSize="large"
              disabled={budgetExpense.length === 0 || budgetIncome.length === 0}
            >
              Submit Budget Overview
            </Button>
          </S.SubmitBudget>
        </S.NoBudgetWrapper>
      )}
    </S.HomeWrapper>
  );
};

export default Home;
