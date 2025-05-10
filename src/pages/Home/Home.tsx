import React, { useEffect, useState } from "react";
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
import { userAtom } from "../../hook/UserAtom.ts";
import Loading from "../../components/Loading/Loading.tsx";
import SharedAccountMessage from "../../components/SharedAccountMessage/SharedAccountMessage.tsx";

const Home = () => {
  const [budget, setBudget] = useAtom(budgetAtom);
  const { getAccessTokenSilently } = useAuth0();
  const budgetIncome = useAtomValue(incomeAtom);
  const budgetExpense = useAtomValue(expenseAtom);
  const currentUser = useAtomValue(userAtom);
  const { currentYear, currentMonth } = getDateInfo();
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [hasBudgetItems, setHasBudgetItems] = useState<boolean>(true);
  const [hasMessage, setHasMessage] = useState<boolean | undefined>(
    currentUser?.connected_message,
  );

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
    setIsDisabled(true);

    try {
      const accessToken = await getAccessTokenSilently({
        authorizationParams: {
          audience: process.env.REACT_APP_AUDIENCE,
          scope: "read:user",
        },
      });
      const insertIds = await createBudget(accessToken, initialBudget);

      const formattedBudget = createInitialBudget(
        initialBudget,
        insertIds.budget_ids,
      );
      setBudget(formattedBudget);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    currentUser && setHasBudgetItems(currentUser.hasBudget);
  }, [currentUser]);

  if (!budget.length && hasBudgetItems) {
    return <Loading />;
  }

  return (
    <S.HomeWrapper>
      {hasMessage && <SharedAccountMessage setHasMessage={setHasMessage} />}
      {!!budget.length && (
        <>
          <S.Section>
            <span>
              Here is an overview of your budget for{" "}
              <span className="capital">{currentMonth}</span> and the entire
              year of {currentYear}.
            </span>
            <span>
              Click on the view icons to see a detailed breakdown of each income
              and expense.
            </span>
          </S.Section>
          <S.BudgetSection>
            <img
              src="/images/monthly.jpg"
              width="400px"
              height="auto"
              alt="monthly piggy bank"
            />
            <Overview
              label="Monthly"
              incomeValue={montlyTotalIncome}
              expenseValue={monthlyTotalExpense}
            />
          </S.BudgetSection>
          <S.BudgetSection>
            <Overview
              label="Yearly"
              incomeValue={yearlyTotalIncome}
              expenseValue={yearlyTotalExpense}
            />
            <img
              src="/images/yearly.jpg"
              width="400px"
              height="auto"
              alt="yearly piggy bank"
            />
          </S.BudgetSection>
        </>
      )}
      {!budget.length && !hasBudgetItems && (
        <SetupBudget
          month={currentMonth}
          year={currentYear}
          isDisabled={isDisabled}
        >
          <S.SubmitBudget>
            <Button
              handleClick={handleBudgetSubmission}
              buttonSize="large"
              disabled={
                !budgetExpense.length || !budgetIncome.length || isDisabled
              }
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
