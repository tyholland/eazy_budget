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

export const getBudgetBreakdown = (budget: BudgetDataItem[] | undefined) => {
  const dataSet: number[] = [];
  const labelSet: string[] = [];

  budget?.forEach((item: BudgetDataItem) => {
    dataSet.push(item.value);
    labelSet.push(item.label);
  });

  return {
    data: dataSet,
    labels: labelSet,
  };
};
