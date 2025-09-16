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

interface DownloadCsvProps {
  type: DownloadTypes;
}

const DownloadCsv = ({ type }: DownloadCsvProps) => {
  const params = useParams();
  const budget = useAtomValue(budgetAtom);
  const { currentYear: theYear } = getDateInfo();
  const currentMonth = params.month;
  const currentYear = Number(params.year) || theYear;
  const currentBudget = budget.filter(
    (bud: BudgetData) => bud.month === currentMonth,
  )[0];
  const { currentExpense, currentIncome } = getMonthlyCSV(currentBudget);
  const { currentBudgetYear, yearlyIncome, yearlyExpense } = getYearlyCSV(
    budget,
    currentYear,
  );
  const currentMonthProfitLoss = getMontlyProfitLossCSV(
    currentIncome,
    currentExpense,
  );
  const currentYearProfitLoss = getYearlyProfitLossCSV(
    yearlyIncome,
    yearlyExpense,
  );

  const incomeBtn = document.querySelector(".incomeBtn");
  const expenseBtn = document.querySelector(".expenseBtn");
  const yearBtn = document.querySelector(".yearBtn");
  const profitLossBtn = document.querySelector(".profitLossBtn");
  const profitLossYearBtn = document.querySelector(".profitLossYearBtn");

  incomeBtn?.addEventListener(
    "click",
    () => {
      trackEvent(`Download ${currentMonth} Income CSV`);
    },
    { once: true },
  );

  expenseBtn?.addEventListener(
    "click",
    () => {
      trackEvent(`Download ${currentMonth} Expense CSV`);
    },
    { once: true },
  );

  yearBtn?.addEventListener(
    "click",
    () => {
      trackEvent(`Download ${currentYear} Budget Overview CSV`);
    },
    { once: true },
  );

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

  return (
    <S.BtnWrapper>
      {type === "yearly" && (
        <>
          <S.CsvBtn
            data={currentBudgetYear}
            headers={[
              "Month",
              "Income Total Amount (USD)",
              "Expense Total Amount (USD)",
            ]}
            filename={`${currentYear}_budget_overview`}
            className="yearBtn"
          >
            Download {currentYear} Budget Overview CSV
          </S.CsvBtn>
          <S.CsvBtn
            data={currentYearProfitLoss}
            headers={["Item", "Amount (USD)"]}
            filename={`${currentYear}_p_and_l`}
            className="profitLossYearBtn"
          >
            Download {currentYear} Profit & Loss Simplified CSV
          </S.CsvBtn>
        </>
      )}
      {type === "monthly" && (
        <>
          <S.CsvBtn
            data={currentIncome}
            headers={["Income", "Amount (USD)", "Is Paid"]}
            filename={`${currentMonth}_income`}
            className="incomeBtn"
          >
            Download {currentMonth} Income CSV
          </S.CsvBtn>
          <S.CsvBtn
            data={currentExpense}
            headers={["Expense", "Amount (USD)", "Is Paid"]}
            filename={`${currentMonth}_expense`}
            className="expenseBtn"
          >
            Download {currentMonth} Expense CSV
          </S.CsvBtn>
          <S.CsvBtn
            data={currentMonthProfitLoss}
            headers={["Item", "Amount (USD)"]}
            filename={`${currentMonth}_p_and_l`}
            className="profitLossBtn"
          >
            Download {currentMonth} Profit & Loss Simplified CSV
          </S.CsvBtn>
        </>
      )}
    </S.BtnWrapper>
  );
};

export default DownloadCsv;
