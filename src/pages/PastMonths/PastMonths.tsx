import React, { useEffect } from "react";
import Overview from "../../views/Overview/Overview.tsx";
import * as S from "./pastMonths.style.ts";
import { useAtomValue } from "jotai";
import { budgetAtom } from "../../hook/BudgetAtom.ts";
import { getMonthlyTotalAmount } from "../../functions/budget.ts";
import {
  getDateInfo,
  getSubscriptionStatus,
  loggedInHomepage,
} from "../../functions/helper.ts";
import { BudgetData } from "../../types.ts";
import SadIcon from "../../svg/SadIcon.tsx";
import { listOfMonths } from "../../constants.ts";
import { userAtom } from "../../hook/UserAtom.ts";
import { useNavigate } from "react-router-dom";

const PastMonths = () => {
  const budget = useAtomValue(budgetAtom);
  const currentUser = useAtomValue(userAtom);
  const navigate = useNavigate();
  const { currentMonth } = getDateInfo();
  const index = listOfMonths.indexOf(currentMonth);

  const previousMonths = budget.filter((item: BudgetData, count: number) => {
    if (count <= index) {
      return item;
    }

    return null;
  });

  useEffect(() => {
    if (
      currentUser &&
      !getSubscriptionStatus("Starter", currentUser?.subscription_id)
    ) {
      navigate(loggedInHomepage(currentUser));
    }
  }, []);

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
            key={`${item.month}-${item.year}`}
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
