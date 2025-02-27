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
    </S.HomeWrapper>
  );
};

export default Home;
