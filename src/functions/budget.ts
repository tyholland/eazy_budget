import { listOfMonths } from "../constants.ts";
import {
  BudgetBodyInfo,
  BudgetData,
  BudgetDataItem,
  BudgetInsertIds,
} from "../types";
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
      let budgetId: number | null = null;
      let budgetDateId: number | null = null;

      item[type].forEach((data: BudgetDataItem) => {
        count += data.value;
        budgetId = data.budget_id;
      });

      dataSet.push(count);
      budgetSet.push({
        label: item.month,
        value: count,
        budget_id: budgetId,
        budget_date_id: budgetDateId,
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
  budget: BudgetBodyInfo[],
  insertIds: BudgetInsertIds[],
) => {
  if (!budget.length) {
    return [];
  }

  const initialBudget: BudgetData[] = [];
  const { currentYear } = getDateInfo();
  const count = listOfMonths.length - 1;

  for (let i = 0; i <= count; i++) {
    const income: BudgetDataItem[] = [];
    const expense: BudgetDataItem[] = [];

    budget.forEach((item: BudgetBodyInfo, index: number) => {
      if (listOfMonths[i] === item.month) {
        if (item.type === "income") {
          income.push({
            label: item.label,
            value: item.amount,
            paid: item.paid,
            budget_id: insertIds[index].budget_id,
            budget_date_id: insertIds[index].budget_date_id,
          });
        }
        if (item.type === "expense") {
          expense.push({
            label: item.label,
            value: item.amount,
            paid: item.paid,
            budget_id: insertIds[index].budget_id,
            budget_date_id: insertIds[index].budget_date_id,
          });
        }
      }
    });

    initialBudget.push({
      year: currentYear,
      month: listOfMonths[i],
      income,
      expense,
    });
  }

  return initialBudget;
};

export const formatBudgetData = (
  income: BudgetDataItem[],
  expense: BudgetDataItem[],
) => {
  if (!income.length || !expense.length) {
    return [];
  }

  const formattedBudget: BudgetBodyInfo[] = [];
  const { currentYear } = getDateInfo();
  const count = listOfMonths.length - 1;

  for (let i = 0; i <= count; i++) {
    income.forEach((response: BudgetDataItem) => {
      formattedBudget.push({
        label: response.label,
        type: "income",
        amount: response.value,
        paid: response.paid,
        month: listOfMonths[i],
        year: currentYear,
      });
    });

    expense.forEach((response: BudgetDataItem) => {
      formattedBudget.push({
        label: response.label,
        type: "expense",
        amount: response.value,
        paid: response.paid,
        month: listOfMonths[i],
        year: currentYear,
      });
    });
  }

  return formattedBudget;
};

export const addAdditionalBudget = (current: number[]) => {
  const newBudget: number[] = [];
  newBudget.push(current.length + 1);

  return current.concat(newBudget);
};

export const addNewBudgetItem = (
  clonedBudget: BudgetData[],
  month: string,
  year: number,
  type: string,
) => {
  clonedBudget.forEach((item: BudgetData, i: number) => {
    if (month === item.month.toLowerCase() && year === item.year) {
      const currentItems: BudgetDataItem[] = [...item[type]];

      currentItems.push({
        label: "",
        value: 0,
        paid: false,
        budget_id: null,
        budget_date_id: currentItems[0].budget_date_id,
      });

      item[type] = currentItems;
    }
  });

  return clonedBudget;
};

export const formatBudgetItem = (data: Object) => {
  const budgetEntries: BudgetDataItem[] = [];

  Object.entries(data).forEach((item) => {
    const val = item[1] as string;

    budgetEntries.push({
      label: item[0],
      value: Number(val.replace("$", "")),
      paid: false,
      budget_id: null,
      budget_date_id: null,
    });
  });

  return budgetEntries;
};

export const reformatBudgetItem = (
  updatedItem: Object,
  budgetId: number | null,
  budgetDateId: number | null,
  isPaid?: boolean,
) => {
  const refactoredItem: BudgetDataItem[] = Object.entries(updatedItem).map(
    (item) => {
      return {
        label: item[0],
        value: item[1],
        paid: isPaid || false,
        budget_id: budgetId,
        budget_date_id: budgetDateId,
      };
    },
  );

  return refactoredItem;
};

export const sortBudget = (
  a: BudgetDataItem,
  b: BudgetDataItem,
  sort?: string,
) => {
  if (sort === "Low - High") {
    return a.value > b.value ? 1 : a.value < b.value ? -1 : 0;
  }

  if (sort === "High - Low") {
    return a.value < b.value ? 1 : a.value > b.value ? -1 : 0;
  }

  if (sort === "Z - A") {
    return a.label.toLowerCase() < b.label.toLowerCase()
      ? 1
      : a.label.toLowerCase() > b.label.toLowerCase()
        ? -1
        : 0;
  }

  return a.label.toLowerCase() > b.label.toLowerCase()
    ? 1
    : a.label.toLowerCase() < b.label.toLowerCase()
      ? -1
      : 0;
};
