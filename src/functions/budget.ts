import { BudgetData, BudgetDataItem } from "../types";

export const getMonthlyTotalAmount = (
  budget: BudgetData[] | null,
  month: string,
  year: number,
  type: string,
) => {
  let amount = 0;

  if (!budget) {
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
  budget: BudgetData[] | null,
  year: number,
  type: string,
) => {
  let amount = 0;

  if (!budget) {
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
  budget: BudgetData[] | null,
  month: string,
  type: string,
  year: number,
) => {
  const dataSet: number[] = [];
  const labelSet: string[] = [];

  budget?.forEach((item: BudgetData) => {
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
  budget: BudgetData[] | null,
  year: number,
  type: string,
) => {
  const dataSet: number[] = [];
  const labelSet: string[] = [];
  const budgetSet: BudgetDataItem[] = [];

  budget?.forEach((item: BudgetData) => {
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
