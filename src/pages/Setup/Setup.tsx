import React, { useEffect, useState } from "react";
import Overview from "../../views/Overview/Overview.tsx";
import * as S from "./setup.style.ts";
import { useAtom } from "jotai";
import { budgetAtom } from "../../hook/BudgetAtom.ts";
import { incomeAtom } from "../../hook/IncomeAtom.ts";
import { expenseAtom } from "../../hook/ExpenseAtom.ts";
import {
  createInitialBudget,
  formatBudgetData,
  getMonthlyTotalAmount,
  getYearlyTotalAmount,
} from "../../functions/budget.ts";
import {
  checkIsExpiredSession,
  getDateInfo,
  getSubscriptionStatus,
  loggedInHomepage,
} from "../../functions/helper.ts";
import Button from "../../components/Button/Button.tsx";
import SetupBudget from "../../views/SetupBudget/SetupBudget.tsx";
import { createBudget } from "../../requests/budget.ts";
import { useAuth0 } from "@auth0/auth0-react";
import { userAtom } from "../../hook/UserAtom.ts";
import Loading from "../../components/Loading/Loading.tsx";
import SharedAccountMessage from "../../components/SharedAccountMessage/SharedAccountMessage.tsx";
import { trackError, trackEvent } from "../../functions/mixpanel.ts";
import PricingDetails from "../../views/PricingDetails/PricingDetails.tsx";
import SessionExpired from "../../components/SessionExpired/SessionExpired.tsx";
import ClientOption from "../../components/ClientOption/ClientOption.tsx";

const Setup = () => {
  const [budget, setBudget] = useAtom(budgetAtom);
  const { getAccessTokenSilently } = useAuth0();
  const [budgetIncome, setBudgetIncome] = useAtom(incomeAtom);
  const [budgetExpense, setBudgetExpense] = useAtom(expenseAtom);
  const [currentUser, setCurrentUser] = useAtom(userAtom);
  const { currentYear, currentMonth } = getDateInfo();
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [isSubmitDisabled, setSubmitIsDisabled] = useState<boolean>(true);
  const [hasBudgetItems, setHasBudgetItems] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasMessage, setHasMessage] = useState<boolean | undefined>(
    currentUser?.connected_message,
  );
  const [isSessionExpired, setIsSessionExpired] = useState<boolean>(false);

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

  const params = new URLSearchParams(window.location.search);
  const plan = params.get("plan");

  plan && localStorage.setItem("plan", plan);

  const handleBudgetSubmission = async () => {
    const initialBudget = formatBudgetData(budgetIncome, budgetExpense);
    setIsDisabled(true);
    setSubmitIsDisabled(true);
    setIsLoading(true);

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
      localStorage.removeItem("budgetIncome");
      localStorage.removeItem("budgetExpense");
      setIsLoading(false);
    } catch (err) {
      trackError("Home - handleBudgetSubmission:", { result: err });
      setSubmitIsDisabled(false);
      setIsDisabled(false);
      setHasBudgetItems(false);

      if (checkIsExpiredSession(err)) {
        setIsSessionExpired(true);
      }
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

  useEffect(() => {
    const storedIncome = localStorage.getItem("budgetIncome");
    if (!!storedIncome) {
      setBudgetIncome(JSON.parse(storedIncome));
    }

    const storedExpense = localStorage.getItem("budgetExpense");
    if (!!storedExpense) {
      setBudgetExpense(JSON.parse(storedExpense));
    }
  }, []);

  if ((!budget.length && hasBudgetItems) || isLoading) {
    return <Loading />;
  }

  const isOriginal = getSubscriptionStatus("OG", currentUser?.subscription_id);
  const isTester = getSubscriptionStatus(
    "Tester",
    currentUser?.subscription_id,
  );
  const foreverFree = isOriginal || isTester;
  const isPro =
    getSubscriptionStatus("Pro", currentUser?.subscription_id) && !foreverFree;
  const isStarter =
    getSubscriptionStatus("Starter", currentUser?.subscription_id) &&
    !foreverFree &&
    !isPro;
  const isClientPlan = getSubscriptionStatus(
    "Client",
    currentUser?.subscription_id,
  );
  const subOwesPayment = (isStarter || isPro) && !currentUser?.paid_sub;
  const subIsAllSet = (!isStarter && !isPro) || !subOwesPayment;
  const isPayingSubscriber = !hasBudgetItems && !!subOwesPayment;
  const isNormalUser = !hasBudgetItems && subIsAllSet;

  if (!!budget.length) {
    window.location.href = loggedInHomepage();
  }

  return (
    <S.HomeWrapper>
      {hasMessage && <SharedAccountMessage setHasMessage={setHasMessage} />}
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
          {!!isClientPlan && <ClientOption isPayPal />}
          {!isClientPlan && (
            <>
              <div>
                Kindly select and complete payment for your preferred
                subscription plan. Alternatively, feel free to choose any option
                that best fits your needs.
              </div>
              <PricingDetails
                isPayPal
                isSelectedPlan={plan || localStorage.getItem("plan")}
                isHighlighted
              />
            </>
          )}
        </>
      )}
      <SessionExpired
        isOpen={isSessionExpired}
        closeModal={setIsSessionExpired}
      />
    </S.HomeWrapper>
  );
};

export default Setup;
