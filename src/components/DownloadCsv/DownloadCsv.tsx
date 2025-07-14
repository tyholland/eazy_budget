import React from "react";
import * as S from "./downloadCsv.style.ts";
import { useAtomValue } from "jotai";
import { budgetAtom } from "../../hook/BudgetAtom.ts";
import { BudgetData, BudgetDataItem, DownloadTypes } from "../../types.ts";
import { getYearlyBudgetBreakdown } from "../../functions/budget.ts";
import { useParams } from "react-router-dom";
import { getDateInfo } from "../../functions/helper.ts";

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
  const { newBudget: yearlyIncome } = getYearlyBudgetBreakdown(
    budget,
    currentYear,
    "income",
  );
  const { newBudget: yearlyExpense } = getYearlyBudgetBreakdown(
    budget,
    currentYear,
    "expense",
  );
  const currentExpense: Omit<
    BudgetDataItem,
    "frequency" | "cadence" | "budget_id" | "budget_date_id" | "type"
  >[] = [];
  const currentIncome: Omit<
    BudgetDataItem,
    "frequency" | "cadence" | "budget_id" | "budget_date_id" | "type"
  >[] = [];
  const currentBudgetYear: any[] = [];

  currentBudget?.expense.forEach((expense: BudgetDataItem) => {
    currentExpense.push({
      label: expense.label,
      value: expense.value,
      paid: expense.paid,
    });
  });

  currentBudget?.income.forEach((expense: BudgetDataItem) => {
    currentIncome.push({
      label: expense.label,
      value: expense.value,
      paid: expense.paid,
    });
  });

  yearlyIncome.forEach((income) => {
    currentBudgetYear.push({
      label: income.label,
      income: income.value,
      expense: 0,
    });
  });

  yearlyExpense.forEach((expense) => {
    currentBudgetYear.forEach((item) => {
      if (expense.label === item.label) {
        item.expense = expense.value;
      }
    });
  });

  return (
    <S.BtnWrapper>
      {type === "yearly" && (
        <S.CsvBtn
          data={currentBudgetYear}
          headers={[
            "Month",
            "Income Total Amount (USD)",
            "Expense Total Amount (USD)",
          ]}
          filename={`${currentYear}_budget_overview`}
        >
          {currentYear} Budget Overview CSV
        </S.CsvBtn>
      )}
      {type === "monthly" && (
        <>
          <S.CsvBtn
            data={currentIncome}
            headers={["Income", "Amount (USD)", "Is Paid"]}
            filename={`${currentMonth}_income`}
          >
            {currentMonth} Income CSV
          </S.CsvBtn>
          <S.CsvBtn
            data={currentExpense}
            headers={["Expense", "Amount (USD)", "Is Paid"]}
            filename={`${currentMonth}_expense`}
          >
            {currentMonth} Expense CSV
          </S.CsvBtn>
        </>
      )}
    </S.BtnWrapper>
  );
};

export default DownloadCsv;
