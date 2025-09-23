import { listOfMonths } from "../constants.ts";
import {
  BudgetBodyInfo,
  BudgetData,
  BudgetDataItem,
  BudgetInsertIds,
  CreateBudgetItems,
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
      const itemNames: string[] = [];
      const itemValues: number[] = [];

      item[type].forEach((data: BudgetDataItem) => {
        count += data.value;
        budgetId = data.budget_id;
        itemNames.push(data.label);
        itemValues.push(data.value);
      });

      dataSet.push(count);
      budgetSet.push({
        label: item.month,
        value: count,
        budget_id: budgetId,
        budget_date_id: budgetDateId,
        item_name: itemNames.length > 0 ? itemNames : undefined,
        item_value: itemValues.length > 0 ? itemValues : undefined,
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

export const formatBudgetItem = (data: Object, month: string, year: number) => {
  const budgetEntries: BudgetDataItem[] = [];

  Object.values(data).forEach((item) => {
    const { value, checked, frequency, label, cadence }: CreateBudgetItems =
      item;

    const freqVal = getFrequencyValue(Number(value), month, year, frequency);

    budgetEntries.push({
      label,
      value: freqVal,
      paid: checked,
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
  category_id?: number,
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
        category_id,
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
    return a.label === ""
      ? 1
      : b.label === ""
        ? -1
        : a.value > b.value
          ? 1
          : a.value < b.value
            ? -1
            : 0;
  }

  if (sort === "High - Low") {
    return a.label === ""
      ? 1
      : b.label === ""
        ? -1
        : a.value < b.value
          ? 1
          : a.value > b.value
            ? -1
            : 0;
  }

  if (sort === "Paid") {
    const paidA = a.paid || false;
    const paidB = b.paid || false;

    return a.label === ""
      ? 1
      : b.label === ""
        ? -1
        : paidA < paidB
          ? 1
          : paidA > paidB
            ? -1
            : 0;
  }

  if (sort === "Unpaid") {
    const paidA = a.paid || false;
    const paidB = b.paid || false;

    return a.label === ""
      ? 1
      : b.label === ""
        ? -1
        : paidA > paidB
          ? 1
          : paidA < paidB
            ? -1
            : 0;
  }

  if (sort === "Z - A") {
    return a.label === ""
      ? 1
      : b.label === ""
        ? -1
        : a.label.toLowerCase() < b.label.toLowerCase()
          ? 1
          : a.label.toLowerCase() > b.label.toLowerCase()
            ? -1
            : 0;
  }

  return a.label === ""
    ? 1
    : b.label === ""
      ? -1
      : a.label.toLowerCase() > b.label.toLowerCase()
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
  const { label, value, paid, frequency, cadence, category_id } =
    updatedBudgetItem;
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
            newBudget.push({
              ...item,
              label,
              value,
              paid,
              frequency,
              cadence,
              category_id,
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
            currentYearBudget[i][type].forEach((item: BudgetDataItem) => {
              if (item.label === originalBudgetItem.label) {
                newBudget.push({
                  ...item,
                  label,
                  value,
                  paid,
                  frequency,
                  cadence,
                  category_id,
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
            newBudget.push({
              ...item,
              label,
              value,
              paid,
              frequency,
              cadence,
              category_id,
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
          if (item.label !== "" && item.value !== 0) {
            newBudget.push(item);
          }
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
          if (item.label !== "" && item.value !== 0) {
            newBudget.push(item);
          }
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
    if (item.label !== "" && item.value !== 0) {
      newBudget.push(item);
    }
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

export const getMonthlyCSV = (currentBudget: BudgetData) => {
  const currentExpense: Omit<
    BudgetDataItem,
    "frequency" | "cadence" | "budget_id" | "budget_date_id" | "type"
  >[] = [];
  const currentIncome: Omit<
    BudgetDataItem,
    "frequency" | "cadence" | "budget_id" | "budget_date_id" | "type"
  >[] = [];

  // Create the monthly expense
  currentBudget?.expense.forEach((expense: BudgetDataItem) => {
    currentExpense.push({
      label: expense.label,
      value: expense.value,
      paid: expense.paid,
    });
  });

  // Create the monthly income
  currentBudget?.income.forEach((expense: BudgetDataItem) => {
    currentIncome.push({
      label: expense.label,
      value: expense.value,
      paid: expense.paid,
    });
  });

  return {
    currentIncome,
    currentExpense,
  };
};

export const getYearlyCSV = (budget: BudgetData[], currentYear: number) => {
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
  const currentBudgetYear: any[] = [];

  // Create the yearly income
  yearlyIncome.forEach((income) => {
    currentBudgetYear.push({
      label: income.label,
      income: income.value,
      expense: 0,
    });
  });

  // Create the yearly expense
  yearlyExpense.forEach((expense) => {
    currentBudgetYear.forEach((item) => {
      if (expense.label === item.label) {
        item.expense = expense.value;
      }
    });
  });

  return {
    currentBudgetYear,
    yearlyIncome,
    yearlyExpense,
  };
};

export const getMontlyProfitLossCSV = (
  currentIncome: Omit<
    BudgetDataItem,
    "frequency" | "cadence" | "budget_id" | "budget_date_id" | "type"
  >[],
  currentExpense: Omit<
    BudgetDataItem,
    "frequency" | "cadence" | "budget_id" | "budget_date_id" | "type"
  >[],
) => {
  let incomeTotal = 0;
  let expenseTotal = 0;

  // Creates the first block for the income
  const currentMonthProfitLoss = [
    {
      label: "Income",
      value: "",
    },
  ];

  currentIncome.forEach((item) => {
    currentMonthProfitLoss.push({
      label: item.label,
      value: item.value.toFixed(2),
    });

    incomeTotal += item.value;
  });

  currentMonthProfitLoss.push({
    label: "Total Income:",
    value: incomeTotal.toFixed(2),
  });

  // Creates an empty line
  currentMonthProfitLoss.push({
    label: "",
    value: "",
  });

  // Creates the second block for the expense
  currentMonthProfitLoss.push({
    label: "Expense",
    value: "",
  });

  currentExpense.forEach((item) => {
    currentMonthProfitLoss.push({
      label: item.label,
      value: item.value.toFixed(2),
    });

    expenseTotal += item.value;
  });

  currentMonthProfitLoss.push({
    label: "Total Expense:",
    value: expenseTotal.toFixed(2),
  });

  // Creates an empty line
  currentMonthProfitLoss.push({
    label: "",
    value: "",
  });

  // Creates the Net Profit line
  currentMonthProfitLoss.push({
    label: "Net Profit",
    value: (incomeTotal - expenseTotal).toFixed(2),
  });

  return currentMonthProfitLoss;
};

export const getYearlyProfitLossCSV = (
  yearlyIncome: BudgetDataItem[],
  yearlyExpense: BudgetDataItem[],
) => {
  let incomeTotal = 0;
  let expenseTotal = 0;

  // Creates the first block for the income
  const currentYearProfitLoss = [
    {
      label: "Income",
      value: "",
    },
  ];

  yearlyIncome.forEach((item) => {
    incomeTotal += item.value;

    item.item_name?.forEach((name, i) => {
      const itemIndex = currentYearProfitLoss
        .map((income) => income.label)
        .indexOf(name);

      if (itemIndex > 0) {
        if (item.item_value) {
          const updatedValue =
            Number(currentYearProfitLoss[itemIndex].value) + item.item_value[i];
          currentYearProfitLoss[itemIndex].value = updatedValue.toFixed(2);
        }
        return;
      }
      currentYearProfitLoss.push({
        label: name,
        value: item.item_value ? item.item_value[i].toFixed(2) : "",
      });
    });
  });

  currentYearProfitLoss.push({
    label: "Total Income:",
    value: incomeTotal.toFixed(2),
  });

  // Creates an empty line
  currentYearProfitLoss.push({
    label: "",
    value: "",
  });

  // Creates the second block for the expense
  currentYearProfitLoss.push({
    label: "Expense",
    value: "",
  });

  yearlyExpense.forEach((item) => {
    expenseTotal += item.value;

    item.item_name?.forEach((name, i) => {
      const itemIndex = currentYearProfitLoss
        .map((expense) => expense.label)
        .indexOf(name);

      if (itemIndex > 0) {
        if (item.item_value) {
          const updatedValue =
            Number(currentYearProfitLoss[itemIndex].value) + item.item_value[i];
          currentYearProfitLoss[itemIndex].value = updatedValue.toFixed(2);
        }
        return;
      }
      currentYearProfitLoss.push({
        label: name,
        value: item.item_value ? item.item_value[i].toFixed(2) : "",
      });
    });
  });

  currentYearProfitLoss.push({
    label: "Total Expense:",
    value: expenseTotal.toFixed(2),
  });

  // Creates an empty line
  currentYearProfitLoss.push({
    label: "",
    value: "",
  });

  // Creates the Net Profit line
  currentYearProfitLoss.push({
    label: "Net Profit",
    value: (incomeTotal - expenseTotal).toFixed(2),
  });

  return currentYearProfitLoss;
};
