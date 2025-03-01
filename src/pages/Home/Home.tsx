import React from "react";
import Overview from "../../views/Overview/Overview.tsx";
import * as S from "./home.style.ts";
import { useAtomValue } from "jotai";
import { budgetAtom } from "../../hook/BudgetAtom.ts";
import {
  getMonthlyTotalAmount,
  getYearlyTotalAmount,
} from "../../functions/budget.ts";
import { getDateInfo } from "../../functions/helper.ts";
import Button from "../../components/Button/Button.tsx";
import SaveIcon from "../../svg/SaveIcon.tsx";

const Home = () => {
  const budget = useAtomValue(budgetAtom);
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

  return (
    <S.HomeWrapper>
      {budget && (
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
      {!budget && (
        <S.NoBudgetWrapper>
          <h2>You haven't entered any Budget info.</h2>
          <S.NoBudgetSection>
            <Button
              handleClick={() =>
                (window.location.href = `/create/income/${currentMonth}/${currentYear}`)
              }
              buttonSize="medium"
            >
              Add income
            </Button>{" "}
            <SaveIcon isDisabled />
          </S.NoBudgetSection>
          <S.NoBudgetSection>
            <Button
              handleClick={() =>
                (window.location.href = `/create/expense/${currentMonth}/${currentYear}`)
              }
              buttonSize="medium"
            >
              Add expense
            </Button>{" "}
            <SaveIcon isDisabled />
          </S.NoBudgetSection>
        </S.NoBudgetWrapper>
      )}
    </S.HomeWrapper>
  );
};

export default Home;
