import React from "react";
import * as S from "./downloadCsv.style.ts";
import { useAtomValue } from "jotai";
import { budgetAtom } from "../../hook/BudgetAtom.ts";
import { BudgetData, DownloadTypes } from "../../types.ts";
import {
  getMonthlyCSV,
  getMontlyProfitLossCSV,
  getYearlyCSV,
  getYearlyProfitLossCSV,
} from "../../functions/budget.ts";
import { useParams } from "react-router-dom";
import { getDateInfo } from "../../functions/helper.ts";
import { trackEvent } from "../../functions/mixpanel.ts";
import { userAtom } from "../../hook/UserAtom.ts";

interface DownloadCsvProps {
  type: DownloadTypes;
}

const DownloadCsv = ({ type }: DownloadCsvProps) => {
  const params = useParams();
  const budget = useAtomValue(budgetAtom);
  const currentUser = useAtomValue(userAtom);
  const { currentYear: theYear } = getDateInfo();
  const currentMonth = params.month;
  const currentYear = Number(params.year) || theYear;
  const currentBudget = budget.filter(
    (bud: BudgetData) => bud.month === currentMonth,
  )[0];
  const { currentExpense, currentIncome } = getMonthlyCSV(currentBudget);
  const { yearlyIncome, yearlyExpense } = getYearlyCSV(budget, currentYear);
  const currentMonthProfitLoss = getMontlyProfitLossCSV(
    currentIncome,
    currentExpense,
    currentUser?.categories,
  );
  const currentYearProfitLoss = getYearlyProfitLossCSV(
    yearlyIncome,
    yearlyExpense,
    currentUser?.categories,
  );

  const profitLossBtn = document.querySelector(".profitLossBtn");
  const profitLossYearBtn = document.querySelector(".profitLossYearBtn");

  profitLossBtn?.addEventListener(
    "click",
    () => {
      trackEvent(`Download ${currentMonth} Profit & Loss Simplified CSV`);
    },
    { once: true },
  );

  profitLossYearBtn?.addEventListener(
    "click",
    () => {
      trackEvent(`Download ${currentYear} Profit & Loss Simplified CSV`);
    },
    { once: true },
  );

  const monthlyCsv: Object[] = [];
  const yearlyCsv: Object[] = [];

  currentMonthProfitLoss.forEach((item) => {
    monthlyCsv.push({
      label: item.label,
      value: item.value,
      percent: item.percent,
    });
  });

  currentYearProfitLoss.forEach((item) => {
    yearlyCsv.push({
      label: item.label,
      value: item.value,
      percent: item.percent,
    });
  });

  return (
    <>
      <S.Title>
        {type === "monthly" ? currentMonth : currentYear} Profit & Loss
        Simplified
      </S.Title>
      <S.ContentWrapper>
        {type === "yearly" && (
          <>
            <S.BudgetBreakdown>
              <S.BudgetLineItem className="header">
                <div className="capital">Item</div>
                <div>Amount</div>
                <div>% of Income</div>
              </S.BudgetLineItem>
              {currentYearProfitLoss.map((item, index) => {
                return (
                  <S.BudgetLineItem key={index} className={item.type}>
                    <div className="capital">{item.label}</div>
                    <div>{item.value}</div>
                    <div>{item.percent}</div>
                  </S.BudgetLineItem>
                );
              })}
            </S.BudgetBreakdown>
            <S.CsvBtn
              data={yearlyCsv}
              headers={["Item", "Amount", "% of Income"]}
              filename={`${currentYear}_p_and_l`}
              className="profitLossYearBtn"
            >
              Download {currentYear} Profit & Loss Simplified CSV
            </S.CsvBtn>
          </>
        )}
        {type === "monthly" && (
          <>
            <S.BudgetBreakdown>
              <S.BudgetLineItem className="header">
                <div className="capital">Item</div>
                <div>Amount</div>
                <div>% of Income</div>
              </S.BudgetLineItem>
              {currentMonthProfitLoss.map((item, index) => {
                return (
                  <S.BudgetLineItem key={index} className={item.type}>
                    <div className="capital">{item.label}</div>
                    <div>{item.value}</div>
                    <div>{item.percent}</div>
                  </S.BudgetLineItem>
                );
              })}
            </S.BudgetBreakdown>
            <S.CsvBtn
              data={monthlyCsv}
              headers={["Item", "Amount", "% of Income"]}
              filename={`${currentMonth}_p_and_l`}
              className="profitLossBtn"
            >
              Download {currentMonth} Profit & Loss Simplified CSV
            </S.CsvBtn>
          </>
        )}
      </S.ContentWrapper>
    </>
  );
};

export default DownloadCsv;
