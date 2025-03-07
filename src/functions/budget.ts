import { listOfMonths } from "../constants.ts";
import { BudgetData, BudgetDataItem } from "../types";
import { getDateInfo } from "./helper.ts";

export const getMonthlyTotalAmount = (
  budget: BudgetData[],
  month: string,
  year: number,
  type: string,
) => {
  let amount = 0;

  if (!budget.length) {
    return amount;
  }

  budget.forEach((item: BudgetData) => {
    if (item.month.toLowerCase() === month && item.year === year) {
      item[type].forEach((data: BudgetDataItem) => {
        amount += data.value;
      });
    }
  });

  return amount;
};

export const getYearlyTotalAmount = (
  budget: BudgetData[],
  year: number,
  type: string,
) => {
  let amount = 0;

  if (!budget.length) {
    return amount;
  }

  budget.forEach((item: BudgetData) => {
    if (item.year === year) {
      item[type].forEach((data: BudgetDataItem) => {
        amount += data.value;
      });
    }
  });

  return amount;
};

export const getMonthlyBudgetBreakdown = (
  budget: BudgetData[],
  month: string,
  type: string,
  year: number,
) => {
  const dataSet: number[] = [];
  const labelSet: string[] = [];

  budget.forEach((item: BudgetData) => {
    if (month === item.month.toLowerCase() && year === item.year) {
      item[type].forEach((data: BudgetDataItem) => {
        dataSet.push(data.value);
        labelSet.push(data.label);
      });
    }
  });

  return {
    data: dataSet,
    labels: labelSet,
  };
};

export const getYearlyBudgetBreakdown = (
  budget: BudgetData[],
  year: number,
  type: string,
) => {
  const dataSet: number[] = [];
  const labelSet: string[] = [];
  const budgetSet: BudgetDataItem[] = [];

  budget.forEach((item: BudgetData) => {
    if (item.year === year) {
      labelSet.push(item.month);
      let count = 0;
      item[type].forEach((data: BudgetDataItem) => {
        count += data.value;
      });
      dataSet.push(count);
      budgetSet.push({
        label: item.month,
        value: count,
      });
    }
  });

  return {
    data: dataSet,
    labels: labelSet,
    newBudget: budgetSet,
  };
};

export const createInitialBudget = (
  income: BudgetDataItem[],
  expense: BudgetDataItem[],
) => {
  if (!income.length || !expense.length) {
    return [];
  }

  const initialBudget: BudgetData[] = [];
  const { currentYear } = getDateInfo();

  for (let i = 0; i <= 11; i++) {
    initialBudget.push({
      year: currentYear,
      month: listOfMonths[i],
      income,
      expense,
    });
  }

  return initialBudget;
};

export const addAdditionalBudget = (current: number[]) => {
  const newBudget: number[] = [];
  newBudget.push(current.length + 1);

  return current.concat(newBudget);
};

export const formatBudgetTypes = (data: Object) => {
  const budgetEntries: BudgetDataItem[] = [];

  Object.entries(data).forEach((item) => {
    const val = item[1] as string;

    budgetEntries.push({
      label: item[0],
      value: Number(val.replace("$", "")),
      paid: false,
    });
  });

  return budgetEntries;
};

export const updateIndividualBudgetItem = (
  budgetItem: BudgetDataItem,
  updatedItem: Object,
) => {
  const refactoredItem: BudgetDataItem = Object.entries(updatedItem).map(
    (item) => {
      return {
        label: item[0],
        value: item[1],
        paid: false,
      };
    },
  )[0];

  Object.assign(budgetItem, refactoredItem);
};
