import React from "react";
import Overview from "../../views/Overview/Overview.tsx";
import * as S from "./home.style.ts";
import { useAtomValue } from "jotai";
import { budgetAtom } from "../../hook/BudgetAtom.ts";
import { getMonthlyTotalAmount } from "../../functions/budget.ts";
import { getDateInfo } from "../../functions/helper.ts";

const Home = () => {
  const budget = useAtomValue(budgetAtom);
  const { currentYear, currentMonth } = getDateInfo();
  const totalIncome = getMonthlyTotalAmount(
    budget,
    currentMonth,
    currentYear,
    "income",
  );
  const totalExpense = getMonthlyTotalAmount(
    budget,
    currentMonth,
    currentYear,
    "expense",
  );

  return (
    <S.HomeWrapper>
      <Overview
        label="Monthly"
        incomeValue={totalIncome}
        expenseValue={totalExpense}
      />
      <Overview label="Yearly" incomeValue={50} expenseValue={20} />
    </S.HomeWrapper>
  );
};

export default Home;
