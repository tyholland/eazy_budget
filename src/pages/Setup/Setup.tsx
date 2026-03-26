import React, { useEffect, useState } from "react";
import * as S from "./setup.style.ts";
import { useAtom } from "jotai";
import { budgetAtom } from "../../hook/BudgetAtom.ts";
import { incomeAtom } from "../../hook/IncomeAtom.ts";
import { expenseAtom } from "../../hook/ExpenseAtom.ts";
import {
  createInitialBudget,
  formatBudgetData,
} from "../../functions/budget.ts";
import {
  checkIsExpiredSession,
  getDateInfo,
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
import SessionExpired from "../../components/SessionExpired/SessionExpired.tsx";

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
    } catch (err) {
      trackError("Setup - handleBudgetSubmission:", { result: err });
      setSubmitIsDisabled(false);
      setIsDisabled(false);
      setHasBudgetItems(false);
      setIsLoading(false);

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

  if (!!budget.length) {
    window.location.href = loggedInHomepage(currentUser);
  }

  return (
    <S.HomeWrapper>
      {hasMessage && <SharedAccountMessage setHasMessage={setHasMessage} />}
      {!budget.length && (
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
      <SessionExpired
        isOpen={isSessionExpired}
        closeModal={setIsSessionExpired}
      />
    </S.HomeWrapper>
  );
};

export default Setup;
