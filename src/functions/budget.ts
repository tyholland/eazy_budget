import { listOfMonths } from "../constants.ts";
import {
  BudgetBodyInfo,
  BudgetData,
  BudgetDataItem,
  BudgetInsertIds,
  CreateBudgetItems,
  NewBudgetIds,
  User,
} from "../types";
import {
  getDateInfo,
  getFormattedCurrency,
  getFrequencyValue,
} from "./helper.ts";

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
      const itemCategories: string[] = [];

      item[type].forEach((data: BudgetDataItem) => {
        count += data.value;
        budgetId = data.budget_id;
        itemNames.push(data.label);
        itemValues.push(data.value);
        itemCategories.push(data.category_id?.toString() || "");
      });

      dataSet.push(count);
      budgetSet.push({
        label: item.month,
        value: count,
        budget_id: budgetId,
        budget_date_id: budgetDateId,
        item_name: itemNames.length > 0 ? itemNames : undefined,
        item_value: itemValues.length > 0 ? itemValues : undefined,
        item_categories: itemCategories.length > 0 ? itemCategories : undefined,
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
        category_id: response.category_id,
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
        temp: true,
      });

      item[type] = currentItems;
    }
  });

  return clonedBudget;
};

export const formatBudgetItem = (data: Object, month: string, year: number) => {
  const budgetEntries: BudgetDataItem[] = [];

  Object.values(data).forEach((item) => {
    const {
      value,
      checked,
      frequency,
      label,
      cadence,
      category_id,
    }: CreateBudgetItems = item;

    const freqVal = getFrequencyValue(Number(value), month, year, frequency);

    budgetEntries.push({
      label,
      value: freqVal,
      paid: checked,
      frequency,
      cadence,
      category_id,
      budget_id: null,
      budget_date_id: null,
      temp: false,
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
        temp: false,
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
      category_id: expense.category_id,
    });
  });

  // Create the monthly income
  currentBudget?.income.forEach((income: BudgetDataItem) => {
    currentIncome.push({
      label: income.label,
      value: income.value,
      paid: income.paid,
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

export const getMontlyProfitLossCSV = async (
  currentIncome: Omit<
    BudgetDataItem,
    "frequency" | "cadence" | "budget_id" | "budget_date_id" | "type"
  >[],
  currentExpense: Omit<
    BudgetDataItem,
    "frequency" | "cadence" | "budget_id" | "budget_date_id" | "type"
  >[],
  currentUser?: User,
) => {
  let incomeTotal = 0;
  let expenseTotal = 0;
  const categories = currentUser?.categories;

  // Creates the first block for the income
  const currentMonthProfitLoss = [
    {
      label: "Income",
      value: "",
      percent: "",
      type: "section",
    },
  ];

  currentIncome.forEach((item) => {
    currentMonthProfitLoss.push({
      label: item.label,
      value: item.value.toString(),
      percent: "",
      type: "",
    });

    incomeTotal += item.value;
  });

  // Total income
  currentMonthProfitLoss.push({
    label: "Total Income",
    value: incomeTotal.toString(),
    percent: "",
    type: "endSection",
  });

  // Creates an empty line
  currentMonthProfitLoss.push({
    label: "",
    value: "",
    percent: "",
    type: "",
  });

  // Creates the second block for the expense
  currentMonthProfitLoss.push({
    label: "Expenses",
    value: "",
    percent: "",
    type: "section",
  });

  if (!!categories && categories.length > 0) {
    categories.forEach((category) => {
      let categoryTotal = 0;

      // Category name
      currentMonthProfitLoss.push({
        label: category.label,
        value: "",
        percent: "",
        type: "category",
      });

      currentExpense.forEach((item) => {
        if (item.category_id === category.id) {
          currentMonthProfitLoss.push({
            label: item.label,
            value: item.value.toString(),
            percent: "",
            type: "",
          });

          expenseTotal += item.value;
          categoryTotal += item.value;
        }
      });

      // Total category amount
      currentMonthProfitLoss.push({
        label: `Total ${category.label}`,
        value: categoryTotal.toString(),
        percent: "",
        type: "endCategory",
      });

      // Creates an empty line
      currentMonthProfitLoss.push({
        label: "",
        value: "",
        percent: "",
        type: "",
      });
    });

    if (currentExpense.some((item) => !item.category_id)) {
      let nonCategoryTotal = 0;

      // Expenses without a category
      currentMonthProfitLoss.push({
        label: "Other Expenses",
        value: "",
        percent: "",
        type: "category",
      });

      currentExpense.forEach((item) => {
        if (!item.category_id) {
          currentMonthProfitLoss.push({
            label: item.label,
            value: item.value.toString(),
            percent: "",
            type: "",
          });

          expenseTotal += item.value;
          nonCategoryTotal += item.value;
        }
      });

      // Total non-category amount
      currentMonthProfitLoss.push({
        label: "Total Other Expenses",
        value: nonCategoryTotal.toString(),
        percent: "",
        type: "endCategory",
      });
    }
  } else {
    currentExpense.forEach((item) => {
      currentMonthProfitLoss.push({
        label: item.label,
        value: item.value.toString(),
        percent: "",
        type: "",
      });

      expenseTotal += item.value;
    });
  }

  // Creates an empty line
  currentMonthProfitLoss.push({
    label: "",
    value: "",
    percent: "",
    type: "",
  });

  // Total Expenses
  currentMonthProfitLoss.push({
    label: "Total Expenses",
    value: expenseTotal.toString(),
    percent: "",
    type: "endSection",
  });

  // Creates an empty line
  currentMonthProfitLoss.push({
    label: "",
    value: "",
    percent: "",
    type: "",
  });

  // Creates the Net Profit line
  currentMonthProfitLoss.push({
    label: "Net Profit",
    value: (incomeTotal - expenseTotal).toString(),
    percent: "",
    type: "net",
  });

  // Add Percentages and show number as currency
  for (const arr of currentMonthProfitLoss) {
    const profitVal = arr.value;
    const profitPercent = arr.percent;

    if (profitVal !== "" && profitPercent !== "% of Income") {
      arr.percent = `${((Number(profitVal) / incomeTotal) * 100).toFixed(2)}%`;

      const { currencyValue } = await getFormattedCurrency(
        Number(profitVal),
        currentUser,
      );

      arr.value = currencyValue;
    }
  }

  return currentMonthProfitLoss;
};

export const getYearlyProfitLossCSV = async (
  yearlyIncome: BudgetDataItem[],
  yearlyExpense: BudgetDataItem[],
  currentUser?: User,
) => {
  let incomeTotal = 0;
  let expenseTotal = 0;
  const categories = currentUser?.categories;

  // Creates the first block for the income
  const currentYearProfitLoss = [
    {
      label: "Income",
      value: "",
      percent: "",
      type: "section",
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
          currentYearProfitLoss[itemIndex].value = updatedValue.toString();
        }
        return;
      }
      currentYearProfitLoss.push({
        label: name,
        value: item.item_value ? item.item_value[i].toString() : "",
        percent: "",
        type: "",
      });
    });
  });

  // Total income
  currentYearProfitLoss.push({
    label: "Total Income:",
    value: incomeTotal.toString(),
    percent: "",
    type: "endSection",
  });

  // Creates an empty line
  currentYearProfitLoss.push({
    label: "",
    value: "",
    percent: "",
    type: "",
  });

  // Creates the second block for the expense
  currentYearProfitLoss.push({
    label: "Expenses",
    value: "",
    percent: "",
    type: "section",
  });

  if (!!categories && categories.length > 0) {
    categories.forEach((category) => {
      let categoryTotal = 0;

      // Create a temp array to get expenses into one name
      const otherCategoryExpense = [
        {
          label: "",
          value: 0,
        },
      ];

      // Category name
      currentYearProfitLoss.push({
        label: category.label,
        value: "",
        percent: "",
        type: "category",
      });

      // Category expenses
      yearlyExpense.forEach((item) => {
        item.item_name?.forEach((name, i) => {
          if (
            item.item_categories &&
            item.item_categories[i] === category.id.toString()
          ) {
            if (otherCategoryExpense.some((item) => item.label === name)) {
              const itemIndex = otherCategoryExpense
                .map((expense) => expense.label)
                .indexOf(name);

              if (itemIndex > 0) {
                if (item.item_value) {
                  const updatedValue =
                    Number(otherCategoryExpense[itemIndex].value) +
                    item.item_value[i];
                  otherCategoryExpense[itemIndex].value = updatedValue;
                }
                return;
              }

              return;
            }

            otherCategoryExpense.push({
              label: name,
              value: item.item_value ? item.item_value[i] : 0,
            });
          }
        });
      });

      // Filter temp array into the main array for the expenses
      otherCategoryExpense.forEach((item) => {
        if (!item.label) {
          return;
        }
        currentYearProfitLoss.push({
          label: item.label,
          value: item.value.toString(),
          percent: "",
          type: "",
        });

        expenseTotal += item.value;
        categoryTotal += item.value;
      });

      // Total category amount
      currentYearProfitLoss.push({
        label: `Total ${category.label}`,
        value: categoryTotal.toString(),
        percent: "",
        type: "endCategory",
      });

      // Creates an empty line
      currentYearProfitLoss.push({
        label: "",
        value: "",
        percent: "",
        type: "",
      });
    });

    let nonCategoryTotal = 0;

    // Expenses without a category
    currentYearProfitLoss.push({
      label: "Other Expenses",
      value: "",
      percent: "",
      type: "category",
    });

    // Create a temp array to get expenses into one name
    const otherExpense = [
      {
        label: "",
        value: 0,
      },
    ];

    yearlyExpense.forEach((item) => {
      item.item_name?.forEach((name, i) => {
        if (item.item_categories && item.item_categories[i] === "") {
          if (otherExpense.some((item) => item.label === name)) {
            const itemIndex = otherExpense
              .map((expense) => expense.label)
              .indexOf(name);

            if (itemIndex > 0) {
              if (item.item_value) {
                const updatedValue =
                  Number(otherExpense[itemIndex].value) + item.item_value[i];
                otherExpense[itemIndex].value = updatedValue;
              }
              return;
            }

            return;
          }

          otherExpense.push({
            label: name,
            value: item.item_value ? item.item_value[i] : 0,
          });
        }
      });
    });

    // Filter temp array into the main array for the expenses
    otherExpense.forEach((item) => {
      if (!item.label) {
        return;
      }
      currentYearProfitLoss.push({
        label: item.label,
        value: item.value.toString(),
        percent: "",
        type: "",
      });

      expenseTotal += item.value;
      nonCategoryTotal += item.value;
    });

    // Total non-category amount
    currentYearProfitLoss.push({
      label: "Total Other Expenses",
      value: nonCategoryTotal.toString(),
      percent: "",
      type: "endCategory",
    });
  } else {
    yearlyExpense.forEach((item) => {
      expenseTotal += item.value;

      item.item_name?.forEach((name, i) => {
        const itemIndex = currentYearProfitLoss
          .map((expense) => expense.label)
          .indexOf(name);

        if (itemIndex > 0) {
          if (item.item_value) {
            const updatedValue =
              Number(currentYearProfitLoss[itemIndex].value) +
              item.item_value[i];
            currentYearProfitLoss[itemIndex].value = updatedValue.toString();
          }
          return;
        }
        currentYearProfitLoss.push({
          label: name,
          value: item.item_value ? item.item_value[i].toString() : "",
          percent: "",
          type: "",
        });
      });
    });
  }

  // Creates an empty line
  currentYearProfitLoss.push({
    label: "",
    value: "",
    percent: "",
    type: "",
  });

  // Total expenses
  currentYearProfitLoss.push({
    label: "Total Expenses",
    value: expenseTotal.toString(),
    percent: "",
    type: "endSection",
  });

  // Creates an empty line
  currentYearProfitLoss.push({
    label: "",
    value: "",
    percent: "",
    type: "",
  });

  // Creates the Net Profit line
  currentYearProfitLoss.push({
    label: "Net Profit",
    value: (incomeTotal - expenseTotal).toString(),
    percent: "",
    type: "net",
  });

  // Add Percentages and show number as currency
  for (const arr of currentYearProfitLoss) {
    const profitVal = arr.value;
    const profitPercent = arr.percent;

    if (profitVal !== "" && profitPercent !== "% of Income") {
      arr.percent = `${((Number(profitVal) / incomeTotal) * 100).toFixed(2)}%`;

      const { currencyValue } = await getFormattedCurrency(
        Number(profitVal),
        currentUser,
      );

      arr.value = currencyValue;
    }
  }

  return currentYearProfitLoss;
};
