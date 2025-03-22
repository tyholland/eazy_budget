import React from "react";
import Overview from "../../views/Overview/Overview.tsx";
import * as S from "./home.style.ts";
import { useAtom, useAtomValue } from "jotai";
import { budgetAtom } from "../../hook/BudgetAtom.ts";
import { incomeAtom } from "../../hook/IncomeAtom.ts";
import { expenseAtom } from "../../hook/ExpenseAtom.ts";
import {
  createInitialBudget,
  formatBudgetData,
  getMonthlyTotalAmount,
  getYearlyTotalAmount,
} from "../../functions/budget.ts";
import { getDateInfo } from "../../functions/helper.ts";
import Button from "../../components/Button/Button.tsx";
import SetupBudget from "../../views/SetupBudget/SetupBudget.tsx";
import { createBudget } from "../../requests/budget.ts";
import { useAuth0 } from "@auth0/auth0-react";

const Home = () => {
  const [budget, setBudget] = useAtom(budgetAtom);
  const { getAccessTokenSilently, user } = useAuth0();
  const budgetIncome = useAtomValue(incomeAtom);
  const budgetExpense = useAtomValue(expenseAtom);
  const { currentYear, currentMonth } = getDateInfo();
  const user_id = user?.sub?.split("|")[1];

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

  const handleBudgetSubmission = async () => {
    const initialBudget = formatBudgetData(budgetIncome, budgetExpense);

    try {
      const accessToken = await getAccessTokenSilently({
        authorizationParams: {
          audience: process.env.REACT_APP_AUDIENCE,
          scope: "read:user",
        },
      });
      const insertIds = await createBudget(accessToken, user_id, initialBudget);

      const formattedBudget = createInitialBudget(initialBudget, insertIds);
      setBudget(formattedBudget);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <S.HomeWrapper>
      {budget.length > 0 && (
        <>
          <S.Section>
            <span>
              Here is an overview of your budget for the month of{" "}
              <span className="capital">{currentMonth}</span> and for the full
              year of {currentYear}.
            </span>
            <span>
              Click on the view icons to see a full breakdown of each income or
              expense.
            </span>
          </S.Section>
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
        <SetupBudget month={currentMonth} year={currentYear}>
          <S.SubmitBudget>
            <Button
              handleClick={handleBudgetSubmission}
              buttonSize="large"
              disabled={budgetExpense.length === 0 || budgetIncome.length === 0}
            >
              Submit Budget
            </Button>
          </S.SubmitBudget>
        </SetupBudget>
      )}
    </S.HomeWrapper>
  );
};

export default Home;
