import { listOfMonths } from "../constants.ts";
import {
  BudgetBodyInfo,
  BudgetData,
  BudgetDataItem,
  BudgetInsertIds,
  NewBudgetIds,
} from "../types";
import { getDateInfo, getFrequencyValue } from "./helper.ts";

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
        labelSet.push(data.label.toUpperCase());
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
        frequency: "Monthly",
        cadence: "Current Month",
        budget_id: null,
        budget_date_id: currentItems[0].budget_date_id,
      });

      item[type] = currentItems;
    }
  });

  return clonedBudget;
};

export const formatBudgetItem = (
  data: Object,
  frequency: string,
  cadence: string,
  month: string,
  year: number,
) => {
  const budgetEntries: BudgetDataItem[] = [];

  Object.entries(data).forEach((item) => {
    const val = item[1] as string;
    const freqVal = getFrequencyValue(
      Number(val.replace("$", "")),
      month,
      year,
      frequency,
    );

    budgetEntries.push({
      label: item[0],
      value: freqVal,
      paid: false,
      frequency,
      cadence,
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
  month: string,
  year: number,
  isPaid?: boolean,
  frequency?: string,
  cadence?: string,
) => {
  const refactoredItem: BudgetDataItem[] = Object.entries(updatedItem).map(
    (item) => {
      const freqVal = getFrequencyValue(item[1], month, year, frequency);

      return {
        label: item[0],
        value: freqVal,
        paid: isPaid || false,
        frequency: frequency || "Monthly",
        cadence,
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

export const getMonthlyPaidExpenses = (
  budget: BudgetData[],
  month: string,
  year: number,
) => {
  let amount = 0;

  if (!budget.length) {
    return amount;
  }

  budget.forEach((item: BudgetData) => {
    if (item.month.toLowerCase() === month && item.year === year) {
      item.expense.forEach((data: BudgetDataItem) => {
        if (data.paid) {
          amount += data.value;
        }
      });
    }
  });

  return amount;
};

export const updateBasedOnCadence = (
  budget: BudgetData,
  updatedBudgetItem: BudgetDataItem,
  fullBudget: BudgetData[],
  originalBudgetItem: BudgetDataItem,
  month: string,
  year: number,
  type: string,
) => {
  const { label, value, paid, frequency, cadence } = updatedBudgetItem;
  const currentYearBudget = fullBudget.filter((specificBudget: BudgetData) => {
    return specificBudget.year === year;
  });

  if (cadence === "Future Months") {
    const startingMonth: number = listOfMonths.indexOf(month);

    for (let i = startingMonth; i <= 11; i++) {
      if (currentYearBudget[i].year === year) {
        const newBudget: BudgetDataItem[] = [];

        currentYearBudget[i][type].forEach((item: BudgetDataItem) => {
          if (item.label === originalBudgetItem.label) {
            newBudget.push({ ...item, label, value, paid, frequency, cadence });
            return;
          }

          newBudget.push(item);
        });

        currentYearBudget[i][type] = newBudget;
      }
    }

    return;
  }

  if (cadence === "All Months") {
    if (frequency === "Quarterly") {
      for (let i = 0; i <= 11; i++) {
        if (currentYearBudget[i].year === year) {
          const newBudget: BudgetDataItem[] = [];

          if (i === 2 || i === 5 || i === 8 || i === 11) {
            currentYearBudget[i][type].forEach((item: BudgetDataItem) => {
              if (item.label === originalBudgetItem.label) {
                newBudget.push({
                  ...item,
                  label,
                  value,
                  paid,
                  frequency,
                  cadence,
                });
                return;
              }

              newBudget.push(item);
            });

            currentYearBudget[i][type] = newBudget;
          }
        }
      }

      return;
    }

    for (let i = 0; i <= 11; i++) {
      if (currentYearBudget[i].year === year) {
        const newBudget: BudgetDataItem[] = [];

        currentYearBudget[i][type].forEach((item: BudgetDataItem) => {
          if (item.label === originalBudgetItem.label) {
            newBudget.push({ ...item, label, value, paid, frequency, cadence });
            return;
          }

          newBudget.push(item);
        });

        currentYearBudget[i][type] = newBudget;
      }
    }

    return;
  }

  // cadence equals "Current Month" or anything else
  const newBudget: BudgetDataItem[] = [];

  budget[type].forEach((item: BudgetDataItem) => {
    if (item.label === originalBudgetItem.label) {
      newBudget.push(updatedBudgetItem);
      return;
    }

    newBudget.push(item);
  });

  budget[type] = newBudget;
};

export const insertBasedOnCadence = (
  budget: BudgetData,
  updatedBudgetItem: BudgetDataItem,
  fullBudget: BudgetData[],
  month: string,
  year: number,
  type: string,
) => {
  const { frequency, cadence } = updatedBudgetItem;
  const currentYearBudget = fullBudget.filter((specificBudget: BudgetData) => {
    return specificBudget.year === year;
  });
  const startingMonth: number = listOfMonths.indexOf(month);

  if (cadence === "Future Months") {
    for (let i = startingMonth; i <= 11; i++) {
      if (currentYearBudget[i].year === year) {
        const newBudget: BudgetDataItem[] = [];

        currentYearBudget[i][type].forEach((item: BudgetDataItem) => {
          newBudget.push(item);
        });

        newBudget.push(updatedBudgetItem);

        currentYearBudget[i][type] = newBudget;
      }
    }

    return;
  }

  if (cadence === "All Months") {
    if (frequency === "Quarterly") {
      for (let i = 0; i <= 11; i++) {
        if (currentYearBudget[i].year === year) {
          const newBudget: BudgetDataItem[] = [];

          if (i === 2 || i === 5 || i === 8 || i === 11) {
            currentYearBudget[i][type].forEach((item: BudgetDataItem) => {
              newBudget.push(item);
            });

            newBudget.push(updatedBudgetItem);

            currentYearBudget[i][type] = newBudget;
          }
        }
      }

      return;
    }

    for (let i = 0; i <= 11; i++) {
      if (currentYearBudget[i].year === year) {
        const newBudget: BudgetDataItem[] = [];

        currentYearBudget[i][type].forEach((item: BudgetDataItem) => {
          newBudget.push(item);
        });

        newBudget.push(updatedBudgetItem);

        currentYearBudget[i][type] = newBudget;
      }
    }

    return;
  }

  // cadence equals "Current Month" or anything else
  const newBudget: BudgetDataItem[] = [];

  budget[type].forEach((item: BudgetDataItem) => {
    newBudget.push(item);
  });

  newBudget.push(updatedBudgetItem);

  budget[type] = newBudget;
};

const getQuarterlyCount = (val: number) => {
  switch (val) {
    case 2:
      return 0;
    case 5:
      return 1;
    case 8:
      return 2;
    case 11:
      return 3;
    default:
      return 0;
  }
};

export const insertBudgetIds = (
  budget: BudgetData,
  updatedBudgetItem: BudgetDataItem,
  fullBudget: BudgetData[],
  month: string,
  year: number,
  type: string,
  budgetItems: NewBudgetIds,
) => {
  const { frequency, cadence } = updatedBudgetItem;
  const currentYearBudget = fullBudget.filter((specificBudget: BudgetData) => {
    return specificBudget.year === year;
  });

  if (cadence === "Future Months") {
    const startingMonth: number = listOfMonths.indexOf(month);

    for (let i = startingMonth; i <= 11; i++) {
      if (currentYearBudget[i].year === year) {
        const newBudget: BudgetDataItem[] = [];

        currentYearBudget[i][type].forEach((item: BudgetDataItem) => {
          if (!item.budget_id) {
            newBudget.push({
              ...updatedBudgetItem,
              budget_date_id: item.budget_date_id,
              budget_id: budgetItems.budget_id[i - startingMonth],
            });
            return;
          }

          newBudget.push(item);
        });

        currentYearBudget[i][type] = newBudget;
      }
    }

    return;
  }

  if (cadence === "All Months") {
    if (frequency === "Quarterly") {
      for (let i = 0; i <= 11; i++) {
        if (currentYearBudget[i].year === year) {
          const newBudget: BudgetDataItem[] = [];

          if (i === 2 || i === 5 || i === 8 || i === 11) {
            const count = getQuarterlyCount(i);
            currentYearBudget[i][type].forEach((item: BudgetDataItem) => {
              if (!item.budget_id) {
                newBudget.push({
                  ...updatedBudgetItem,
                  budget_date_id: item.budget_date_id,
                  budget_id: budgetItems.budget_id[count],
                });
                return;
              }

              newBudget.push(item);
            });

            currentYearBudget[i][type] = newBudget;
          }
        }
      }

      return;
    }

    for (let i = 0; i <= 11; i++) {
      if (currentYearBudget[i].year === year) {
        const newBudget: BudgetDataItem[] = [];

        currentYearBudget[i][type].forEach((item: BudgetDataItem) => {
          if (!item.budget_id) {
            newBudget.push({
              ...updatedBudgetItem,
              budget_date_id: item.budget_date_id,
              budget_id: budgetItems.budget_id[i],
            });
            return;
          }

          newBudget.push(item);
        });

        currentYearBudget[i][type] = newBudget;
      }
    }

    return;
  }

  // cadence equals "Current Month" or anything else
  const newBudget: BudgetDataItem[] = [];

  budget[type].forEach((item: BudgetDataItem) => {
    if (!item.budget_id) {
      newBudget.push({
        ...updatedBudgetItem,
        budget_id: budgetItems.budget_id as number,
      });
      return;
    }

    newBudget.push(item);
  });

  budget[type] = newBudget;
};
