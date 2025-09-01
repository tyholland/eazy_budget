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
import { getDateInfo, getSubscriptionStatus } from "../../functions/helper.ts";
import Button from "../../components/Button/Button.tsx";
import SetupBudget from "../../views/SetupBudget/SetupBudget.tsx";
import { createBudget } from "../../requests/budget.ts";
import { useAuth0 } from "@auth0/auth0-react";
import { userAtom } from "../../hook/UserAtom.ts";
import Loading from "../../components/Loading/Loading.tsx";
import SharedAccountMessage from "../../components/SharedAccountMessage/SharedAccountMessage.tsx";
import { trackError, trackEvent } from "../../functions/mixpanel.ts";
import PricingDetails from "../../views/PricingDetails/PricingDetails.tsx";

const Home = () => {
  const [budget, setBudget] = useAtom(budgetAtom);
  const { getAccessTokenSilently } = useAuth0();
  const budgetIncome = useAtomValue(incomeAtom);
  const budgetExpense = useAtomValue(expenseAtom);
  const [currentUser, setCurrentUser] = useAtom(userAtom);
  const { currentYear, currentMonth } = getDateInfo();
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [isSubmitDisabled, setSubmitIsDisabled] = useState<boolean>(true);
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
    setSubmitIsDisabled(true);

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
      setHasBudgetItems(true);
      currentUser &&
        setCurrentUser({
          ...currentUser,
          hasBudget: true,
        });
      trackEvent("Submitted Initial Budget");
    } catch (err) {
      trackError("Home - handleBudgetSubmission:", { result: err });
      setSubmitIsDisabled(false);
      setIsDisabled(false);
      setHasBudgetItems(false);
    }
  };

  useEffect(() => {
    currentUser && setHasBudgetItems(currentUser.hasBudget);
  }, [currentUser]);

  useEffect(() => {
    if (budgetIncome.length > 0 && budgetExpense.length > 0) {
      setSubmitIsDisabled(false);
    }
  }, [budgetIncome, budgetExpense]);

  if (!budget.length && hasBudgetItems) {
    return <Loading />;
  }

  const isOriginal = getSubscriptionStatus("OG", currentUser?.subscription_id);
  const isPro =
    getSubscriptionStatus("Pro", currentUser?.subscription_id) && !isOriginal;
  const isStarter =
    getSubscriptionStatus("Starter", currentUser?.subscription_id) &&
    !isOriginal &&
    !isPro;
  const subOwesPayment = (isStarter || isPro) && !currentUser?.paid_sub;
  const subIsAllSet = (!isStarter && !isPro) || !subOwesPayment;
  const isPayingSubscriber = !hasBudgetItems && !!subOwesPayment;
  const isNormalUser = !hasBudgetItems && subIsAllSet;

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
      {!budget.length && isNormalUser && (
        <SetupBudget
          month={currentMonth}
          year={currentYear}
          isDisabled={isDisabled}
        >
          <S.SubmitBudget>
            <Button
              handleClick={handleBudgetSubmission}
              buttonSize="large"
              disabled={isSubmitDisabled}
            >
              Submit Budget
            </Button>
          </S.SubmitBudget>
        </SetupBudget>
      )}
      {!budget.length && isPayingSubscriber && (
        <>
          <div>
            Kindly select and complete payment for your preferred subscription
            plan. Alternatively, feel free to choose any option that best fits
            your needs.
          </div>
          <PricingDetails isPayPal />
        </>
      )}
    </S.HomeWrapper>
  );
};

export default Home;
