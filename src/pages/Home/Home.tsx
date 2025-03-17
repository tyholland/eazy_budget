import React from "react";
import Overview from "../../views/Overview/Overview.tsx";
import * as S from "./home.style.ts";
import { useAtom, useAtomValue } from "jotai";
import { budgetAtom } from "../../hook/BudgetAtom.ts";
import { incomeAtom } from "../../hook/IncomeAtom.ts";
import { expenseAtom } from "../../hook/ExpenseAtom.ts";
import { userAtom } from "../../hook/UserAtom.ts";
import {
  createInitialBudget,
  getMonthlyTotalAmount,
  getYearlyTotalAmount,
} from "../../functions/budget.ts";
import { getDateInfo } from "../../functions/helper.ts";
import Button from "../../components/Button/Button.tsx";
import { useAuth0 } from "@auth0/auth0-react";
import SetupBudget from "../../views/SetupBudget/SetupBudget.tsx";

const Home = () => {
  const [budget, setBudget] = useAtom(budgetAtom);
  const [currentUser, setCurrentUser] = useAtom(userAtom);
  const { isAuthenticated, user } = useAuth0();
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

  if (isAuthenticated && !currentUser) {
    setCurrentUser(user);
  }

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
            predictYear={currentYear}
          />
        </>
      )}
      {budget.length === 0 && (
        <SetupBudget month={currentMonth} year={currentYear}>
          <S.SubmitBudget>
            <Button
              handleClick={handleBudgetSubmission}
              buttonSize="large"
              disabled={budgetExpense.length === 0 || budgetIncome.length === 0}
            >
              Submit Budget Overview
            </Button>
          </S.SubmitBudget>
        </SetupBudget>
      )}
    </S.HomeWrapper>
  );
};

export default Home;
