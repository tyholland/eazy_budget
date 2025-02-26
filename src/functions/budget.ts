import { BudgetDataItem } from "../types";

export const getTotalAmount = (budget: BudgetDataItem[] | undefined) => {
  let amount = 0;

  if (!budget) {
    return amount;
  }

  budget.forEach((item) => {
    amount += item.value;
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
