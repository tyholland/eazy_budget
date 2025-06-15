import React from "react";
import * as S from "./downloadCsv.style.ts";
import { useAtomValue } from "jotai";
import { budgetAtom } from "../../hook/BudgetAtom.ts";
import { getDateInfo } from "../../functions/helper.ts";
import { BudgetData, BudgetDataItem } from "../../types.ts";
import { getYearlyBudgetBreakdown } from "../../functions/budget.ts";

const DownloadCsv = () => {
  const budget = useAtomValue(budgetAtom);
  const { currentYear, currentMonth } = getDateInfo();
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
    <>
      <S.Title>Download Excel of Budget</S.Title>
      <S.BtnWrapper>
        <S.CsvBtn
          data={currentBudgetYear}
          headers={[
            "Month",
            "Income Total Amount (USD)",
            "Expense Total Amount (USD)",
          ]}
          filename={`${currentYear}_budget_overview`}
        >
          Download {currentYear} Budget Overview
        </S.CsvBtn>
        <S.CsvBtn
          data={currentIncome}
          headers={["Income", "Amount (USD)", "Is Paid"]}
          filename={`${currentMonth}_income`}
        >
          Download {currentMonth} Income
        </S.CsvBtn>
        <S.CsvBtn
          data={currentExpense}
          headers={["Expense", "Amount (USD)", "Is Paid"]}
          filename={`${currentMonth}_expense`}
        >
          Download {currentMonth} Expense
        </S.CsvBtn>
      </S.BtnWrapper>
    </>
  );
};

export default DownloadCsv;
