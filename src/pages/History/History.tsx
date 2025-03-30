import React from "react";
import Overview from "../../views/Overview/Overview.tsx";
import * as S from "./history.style.ts";
import { useAtomValue } from "jotai";
import { budgetAtom } from "../../hook/BudgetAtom.ts";
import { getYearlyTotalAmount } from "../../functions/budget.ts";
import { getDateInfo } from "../../functions/helper.ts";
import { BudgetData } from "../../types.ts";
import SadIcon from "../../svg/SadIcon.tsx";

const History = () => {
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
      {!previousYears.length && (
        <S.NoHistory>
          <SadIcon />
          <div className="content">
            <span>You don't have any records before {currentYear}.</span>
            <span>Come back next year to view past records.</span>
          </div>
        </S.NoHistory>
      )}
    </S.Wrapper>
  );
};

export default History;
