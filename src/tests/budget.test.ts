import { beforeEach, describe, expect, test } from "@jest/globals";
import {
  getMonthlyTotalAmount,
  getMonthlyBudgetBreakdown,
  getYearlyTotalAmount,
  getYearlyBudgetBreakdown,
  createInitialBudget,
  addAdditionalBudget,
  formatBudgetItem,
  reformatBudgetItem,
  addNewBudgetItem,
  formatBudgetData,
  sortBudget,
  getMonthlyPaidExpenses,
} from "../functions/budget";
import {
  mockBudget,
  mockBudgetBody,
  mockBudgetEntries,
  mockBudgetEntries2,
  mockBudgetEntries3,
  mockBudgetEntries4,
  mockBudgetEntries5,
  mockBudgetEntriesNoDollar,
  mockBudgetFull,
  mockBudgetInsertIds,
  mockBudgetItemArray,
  mockBudgetTwo,
  mockBudgetItemArray2,
  mockBudgetItemArray3,
  mockBudgetItemArray4,
  mockBudgetItemArray5,
} from "./mocks";
import {
  BudgetBodyInfo,
  BudgetData,
  BudgetDataItem,
  BudgetInsertIds,
} from "../types";

let budget: BudgetData[];
let budgetBody: BudgetBodyInfo[];
let budgetEntries: Object;
let budgetEntries2: Object;
let budgetEntries3: Object;
let budgetEntries4: Object;
let budgetEntries5: Object;
let budgetEntriesNoDollar: Object;
let budgetFull: BudgetData[];
let budgetInsertIds: BudgetInsertIds[];
let budgetItemArray: BudgetDataItem[];
let budgetItemArray2: BudgetDataItem[];
let budgetItemArray3: BudgetDataItem[];
let budgetItemArray4: BudgetDataItem[];
let budgetItemArray5: BudgetDataItem[];
let budgetTwo: BudgetData[];

beforeEach(() => {
  budget = JSON.parse(JSON.stringify(mockBudget));
  budgetBody = JSON.parse(JSON.stringify(mockBudgetBody));
  budgetEntries = JSON.parse(JSON.stringify(mockBudgetEntries));
  budgetEntries2 = JSON.parse(JSON.stringify(mockBudgetEntries2));
  budgetEntries3 = JSON.parse(JSON.stringify(mockBudgetEntries3));
  budgetEntries4 = JSON.parse(JSON.stringify(mockBudgetEntries4));
  budgetEntries5 = JSON.parse(JSON.stringify(mockBudgetEntries5));
  budgetEntriesNoDollar = JSON.parse(JSON.stringify(mockBudgetEntriesNoDollar));
  budgetFull = JSON.parse(JSON.stringify(mockBudgetFull));
  budgetInsertIds = JSON.parse(JSON.stringify(mockBudgetInsertIds));
  budgetItemArray = JSON.parse(JSON.stringify(mockBudgetItemArray));
  budgetItemArray2 = JSON.parse(JSON.stringify(mockBudgetItemArray2));
  budgetItemArray3 = JSON.parse(JSON.stringify(mockBudgetItemArray3));
  budgetItemArray4 = JSON.parse(JSON.stringify(mockBudgetItemArray4));
  budgetItemArray5 = JSON.parse(JSON.stringify(mockBudgetItemArray5));
  budgetTwo = JSON.parse(JSON.stringify(mockBudgetTwo));
});

describe("getMonthlyTotalAmount", () => {
  test("should return 0", () => {
    const amount = getMonthlyTotalAmount([], "january", 2025, "income");

    expect(amount).toBe(0);
  });

  test("should return total monthly amount", () => {
    const amount = getMonthlyTotalAmount(budget, "january", 2025, "expense");

    expect(amount).toBe(36);
  });
});

describe("getYearlyTotalAmount", () => {
  test("should return 0", () => {
    const amount = getYearlyTotalAmount([], 2025, "income");

    expect(amount).toBe(0);
  });

  test("should return total yearly amount", () => {
    const amount = getYearlyTotalAmount(budget, 2025, "income");

    expect(amount).toBe(70000);
  });
});

describe("getMonthlyBudgetBreakdown", () => {
  test("should return empty arrays", () => {
    const results = getMonthlyBudgetBreakdown([], "january", "expense", 2025);
    const expectedResults = JSON.stringify({
      data: [],
      labels: [],
    });

    expect(JSON.stringify(results)).toBe(expectedResults);
  });

  test("should return full results of monthly budget", () => {
    const results = getMonthlyBudgetBreakdown(
      budget,
      "january",
      "expense",
      2025,
    );
    const expectedResults = JSON.stringify({
      data: [19, 17],
      labels: ["NETFLIX", "HULU"],
    });

    expect(JSON.stringify(results)).toBe(expectedResults);
  });
});

describe("getYearlyBudgetBreakdown", () => {
  test("should return empty arrays", () => {
    const results = getYearlyBudgetBreakdown([], 2025, "expense");
    const expectedResults = JSON.stringify({
      data: [],
      labels: [],
      newBudget: [],
    });

    expect(JSON.stringify(results)).toBe(expectedResults);
  });

  test("should return full results of yearly budget", () => {
    const results = getYearlyBudgetBreakdown(budget, 2025, "expense");
    const expectedResults = JSON.stringify({
      data: [36],
      labels: ["january"],
      newBudget: [
        {
          label: "january",
          value: 36,
          budget_id: null,
          budget_date_id: null,
          item_name: ["Netflix", "Hulu"],
          item_value: [19, 17],
          item_categories: ["", ""],
        },
      ],
    });

    expect(JSON.stringify(results)).toBe(expectedResults);
  });
});

describe("createInitialBudget", () => {
  test("should return empty array", () => {
    const results = createInitialBudget([], []);
    const expectedResults = JSON.stringify([]);

    expect(JSON.stringify(results)).toBe(expectedResults);
  });

  test("should return initial budget", () => {
    const results = createInitialBudget(budgetBody, budgetInsertIds);
    const expectedResults = JSON.stringify(budgetFull);

    expect(JSON.stringify(results)).toBe(expectedResults);
  });
});

describe("addAdditionalBudget", () => {
  test("should work with empty array", () => {
    const results = addAdditionalBudget([]);
    const expectedResults = JSON.stringify([1]);

    expect(JSON.stringify(results)).toBe(expectedResults);
  });

  test("should work with populated array", () => {
    const results = addAdditionalBudget([1, 2, 3]);
    const expectedResults = JSON.stringify([1, 2, 3, 4]);

    expect(JSON.stringify(results)).toBe(expectedResults);
  });
});

describe("formatBudgetItem", () => {
  test("should return an empty array", () => {
    const results = formatBudgetItem({}, "january", 2025);
    const expectedResults = JSON.stringify([]);

    expect(JSON.stringify(results)).toBe(expectedResults);
  });

  test("should return monthly budget entries", () => {
    const results = formatBudgetItem(budgetEntries, "january", 2025);
    const expectedResults = JSON.stringify(budgetItemArray);

    expect(JSON.stringify(results)).toBe(expectedResults);
  });

  test("should return weekly budget entries", () => {
    const results = formatBudgetItem(budgetEntries2, "january", 2025);
    const expectedResults = JSON.stringify(budgetItemArray2);

    expect(JSON.stringify(results)).toBe(expectedResults);
  });

  test("should return semi-monthly budget entries", () => {
    const results = formatBudgetItem(budgetEntries3, "january", 2025);
    const expectedResults = JSON.stringify(budgetItemArray3);

    expect(JSON.stringify(results)).toBe(expectedResults);
  });

  test("should return daily budget entries", () => {
    const results = formatBudgetItem(budgetEntries4, "january", 2025);
    const expectedResults = JSON.stringify(budgetItemArray4);

    expect(JSON.stringify(results)).toBe(expectedResults);
  });

  test("should return quarterly budget entries", () => {
    const results = formatBudgetItem(budgetEntries5, "january", 2025);
    const expectedResults = JSON.stringify(budgetItemArray5);

    expect(JSON.stringify(results)).toBe(expectedResults);
  });
});

describe("reformatBudgetItem", () => {
  test("should return an empty array", () => {
    const results = reformatBudgetItem({}, null, null, "april", 2025, true);
    const expectedResults = JSON.stringify([]);

    expect(JSON.stringify(results)).toBe(expectedResults);
  });

  test("should return budget items", () => {
    const results = reformatBudgetItem(
      budgetEntriesNoDollar,
      null,
      null,
      "april",
      2025,
      false,
      "Monthly",
      "Current Month",
    );
    const expectedResults = JSON.stringify(budgetItemArray);

    expect(JSON.stringify(results)).toBe(expectedResults);
  });
});

describe("addNewBudgetItem", () => {
  test("should add a new budget item", () => {
    const results = addNewBudgetItem(budget, "january", 2025, "income");
    const newBudget = [...budget];
    newBudget[0].income.push({
      label: "",
      value: 0,
      budget_id: null,
      budget_date_id: null,
    });
    const expectedResults = JSON.stringify(newBudget);

    expect(JSON.stringify(results)).toBe(expectedResults);
  });
});

describe("formatBudgetData", () => {
  test("should return empty array for empty income", () => {
    const results = formatBudgetData([], budget[0].expense);
    const expectedResults = JSON.stringify([]);

    expect(JSON.stringify(results)).toBe(expectedResults);
  });

  test("should return empty array for empty expense", () => {
    const results = formatBudgetData(budget[0].income, []);
    const expectedResults = JSON.stringify([]);

    expect(JSON.stringify(results)).toBe(expectedResults);
  });

  test("should return formatted budget", () => {
    const results = formatBudgetData(budgetTwo[0].income, budgetTwo[0].expense);
    const expectedResults = JSON.stringify(budgetBody);

    expect(JSON.stringify(results)).toBe(expectedResults);
  });
});

describe("sortBudget", () => {
  test("should return alpha asc budget items as default sort", () => {
    const results = budgetItemArray.sort(sortBudget);
    const expectedResults = JSON.stringify([
      {
        label: "hulu",
        value: 20.99,
        paid: false,
        frequency: "Monthly",
        cadence: "Current Month",
        budget_id: null,
        budget_date_id: null,
        temp: false,
      },
      {
        label: "internet",
        value: 70.7,
        paid: false,
        frequency: "Monthly",
        cadence: "Current Month",
        budget_id: null,
        budget_date_id: null,
        temp: false,
      },
      {
        label: "netflix",
        value: 19.99,
        paid: false,
        frequency: "Monthly",
        cadence: "Current Month",
        budget_id: null,
        budget_date_id: null,
        temp: false,
      },
    ]);

    expect(JSON.stringify(results)).toBe(expectedResults);
  });

  test("should return alpha desc budget items", () => {
    const results = budgetItemArray.sort((a, b) => sortBudget(a, b, "Z - A"));
    const expectedResults = JSON.stringify([
      {
        label: "netflix",
        value: 19.99,
        paid: false,
        frequency: "Monthly",
        cadence: "Current Month",
        budget_id: null,
        budget_date_id: null,
        temp: false,
      },
      {
        label: "internet",
        value: 70.7,
        paid: false,
        frequency: "Monthly",
        cadence: "Current Month",
        budget_id: null,
        budget_date_id: null,
        temp: false,
      },
      {
        label: "hulu",
        value: 20.99,
        paid: false,
        frequency: "Monthly",
        cadence: "Current Month",
        budget_id: null,
        budget_date_id: null,
        temp: false,
      },
    ]);

    expect(JSON.stringify(results)).toBe(expectedResults);
  });

  test("should return numeric asc budget items", () => {
    const results = budgetItemArray.sort((a, b) =>
      sortBudget(a, b, "High - Low"),
    );
    const expectedResults = JSON.stringify([
      {
        label: "internet",
        value: 70.7,
        paid: false,
        frequency: "Monthly",
        cadence: "Current Month",
        budget_id: null,
        budget_date_id: null,
        temp: false,
      },
      {
        label: "hulu",
        value: 20.99,
        paid: false,
        frequency: "Monthly",
        cadence: "Current Month",
        budget_id: null,
        budget_date_id: null,
        temp: false,
      },
      {
        label: "netflix",
        value: 19.99,
        paid: false,
        frequency: "Monthly",
        cadence: "Current Month",
        budget_id: null,
        budget_date_id: null,
        temp: false,
      },
    ]);

    expect(JSON.stringify(results)).toBe(expectedResults);
  });

  test("should return numeric desc budget items", () => {
    const results = budgetItemArray.sort((a, b) =>
      sortBudget(a, b, "Low - High"),
    );
    const expectedResults = JSON.stringify([
      {
        label: "netflix",
        value: 19.99,
        paid: false,
        frequency: "Monthly",
        cadence: "Current Month",
        budget_id: null,
        budget_date_id: null,
        temp: false,
      },
      {
        label: "hulu",
        value: 20.99,
        paid: false,
        frequency: "Monthly",
        cadence: "Current Month",
        budget_id: null,
        budget_date_id: null,
        temp: false,
      },
      {
        label: "internet",
        value: 70.7,
        paid: false,
        frequency: "Monthly",
        cadence: "Current Month",
        budget_id: null,
        budget_date_id: null,
        temp: false,
      },
    ]);

    expect(JSON.stringify(results)).toBe(expectedResults);
  });
});

describe("getMonthlyPaidExpenses", () => {
  test("should return 0", () => {
    const amount = getMonthlyPaidExpenses([], "january", 2025);

    expect(amount).toBe(0);
  });

  test("should return total monthly amount", () => {
    const amount = getMonthlyPaidExpenses(budget, "january", 2025);

    expect(amount).toBe(19);
  });
});
