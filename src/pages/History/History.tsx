import React from "react";
import Overview from "../../views/Overview/Overview.tsx";
import * as S from "./history.style.ts";
import { useAtomValue } from "jotai";
import { budgetAtom } from "../../hook/BudgetAtom.ts";
import { getYearlyTotalAmount } from "../../functions/budget.ts";
import { getDateInfo } from "../../functions/helper.ts";
import { BudgetData } from "../../types.ts";
import StopIcon from "../../svg/StopIcon.tsx";

const Home = () => {
  const budget = useAtomValue(budgetAtom);
  const { currentYear } = getDateInfo();

  const previousYears = budget.filter((item: BudgetData) => {
    return item.year < currentYear;
  });

  return (
    <S.Wrapper>
      {previousYears.map((item: BudgetData) => {
        const yearlyTotalIncome = getYearlyTotalAmount(
          [item],
          item.year,
          "income",
        );
        const yearlyTotalExpense = getYearlyTotalAmount(
          [item],
          item.year,
          "expense",
        );

        return (
          <Overview
            label={`${item.year} Budget`}
            incomeValue={yearlyTotalIncome}
            expenseValue={yearlyTotalExpense}
            hideViewIcon
          />
        );
      })}
      {previousYears.length === 0 && (
        <S.NoHistory>
          <StopIcon />
          <div className="content">
            <span>You don't have any records prior to {currentYear}.</span>
            <span>Comeback the following year to see some records.</span>
          </div>
        </S.NoHistory>
      )}
    </S.Wrapper>
  );
};

export default Home;
