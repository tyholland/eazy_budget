import React, { useEffect } from "react";
import Overview from "../../views/Overview/Overview.tsx";
import * as S from "./pastMonths.style.ts";
import { useAtomValue } from "jotai";
import { budgetAtom } from "../../hook/BudgetAtom.ts";
import {
  getMonthlyTotalAmount,
  getYearlyTotalAmount,
} from "../../functions/budget.ts";
import { getDateInfo } from "../../functions/helper.ts";
import { BudgetData } from "../../types.ts";
import SadIcon from "../../svg/SadIcon.tsx";
import { listOfMonths } from "../../constants.ts";

const PastMonths = () => {
  const budget = useAtomValue(budgetAtom);
  const { currentYear, currentMonth } = getDateInfo();
  const index = listOfMonths.indexOf(currentMonth);

  const previousMonths = budget.filter((item: BudgetData, count: number) => {
    if (count <= index) {
      return item;
    }
  });

  return (
    <S.Wrapper>
      {previousMonths.map((item: BudgetData) => {
        const monthlyTotalIncome = getMonthlyTotalAmount(
          [item],
          item.month,
          item.year,
          "income",
        );
        const monthlyTotalExpense = getMonthlyTotalAmount(
          [item],
          item.month,
          item.year,
          "expense",
        );

        return (
          <Overview
            label={`${item.month} Budget`}
            incomeValue={monthlyTotalIncome}
            expenseValue={monthlyTotalExpense}
            hideViewIcon
          />
        );
      })}
      {!previousMonths.length && (
        <S.NoHistory>
          <SadIcon />
          <div className="content">
            <span>You don't have any records before {currentMonth}.</span>
            <span>Come back next month to view past records.</span>
          </div>
        </S.NoHistory>
      )}
    </S.Wrapper>
  );
};

export default PastMonths;
