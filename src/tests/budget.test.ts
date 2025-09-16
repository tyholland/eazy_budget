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
  updateBasedOnCadence,
  insertBasedOnCadence,
  insertBudgetIds,
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
  mockBudgetFullUpdated,
  mockBudgetFullInserted,
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
let budgetFullUpdated: BudgetData[];
let budgetFullInserted: BudgetData[];

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
  budgetFullUpdated = JSON.parse(JSON.stringify(mockBudgetFullUpdated));
  budgetFullInserted = JSON.parse(JSON.stringify(mockBudgetFullInserted));
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
      },
      {
        label: "internet",
        value: 70.7,
        paid: false,
        frequency: "Monthly",
        cadence: "Current Month",
        budget_id: null,
        budget_date_id: null,
      },
      {
        label: "netflix",
        value: 19.99,
        paid: false,
        frequency: "Monthly",
        cadence: "Current Month",
        budget_id: null,
        budget_date_id: null,
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
      },
      {
        label: "internet",
        value: 70.7,
        paid: false,
        frequency: "Monthly",
        cadence: "Current Month",
        budget_id: null,
        budget_date_id: null,
      },
      {
        label: "hulu",
        value: 20.99,
        paid: false,
        frequency: "Monthly",
        cadence: "Current Month",
        budget_id: null,
        budget_date_id: null,
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
      },
      {
        label: "hulu",
        value: 20.99,
        paid: false,
        frequency: "Monthly",
        cadence: "Current Month",
        budget_id: null,
        budget_date_id: null,
      },
      {
        label: "netflix",
        value: 19.99,
        paid: false,
        frequency: "Monthly",
        cadence: "Current Month",
        budget_id: null,
        budget_date_id: null,
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
      },
      {
        label: "hulu",
        value: 20.99,
        paid: false,
        frequency: "Monthly",
        cadence: "Current Month",
        budget_id: null,
        budget_date_id: null,
      },
      {
        label: "internet",
        value: 70.7,
        paid: false,
        frequency: "Monthly",
        cadence: "Current Month",
        budget_id: null,
        budget_date_id: null,
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

describe("updateBasedOnCadence", () => {
  test("should update current month if no cadence is selected", () => {
    updateBasedOnCadence(
      budgetFull[0],
      budgetFullUpdated[0].income[0],
      budgetFull,
      budgetFull[0].income[0],
      "january",
      2025,
      "income",
    );

    expect(JSON.stringify(budgetFull[0].income[0])).toBe(
      JSON.stringify(budgetFullUpdated[0].income[0]),
    );
  });

  test("should update current month", () => {
    updateBasedOnCadence(
      budgetFull[0],
      budgetFullUpdated[0].expense[0],
      budgetFull,
      budgetFull[0].expense[0],
      "january",
      2025,
      "expense",
    );

    expect(JSON.stringify(budgetFull[0].expense[0])).toBe(
      JSON.stringify(budgetFullUpdated[0].expense[0]),
    );
  });

  test("should update future months", () => {
    updateBasedOnCadence(
      budgetFull[1],
      budgetFullUpdated[1].income[0],
      budgetFull,
      budgetFull[1].income[0],
      "february",
      2025,
      "income",
    );

    const updatedBudget = [
      {
        year: 2025,
        month: "january",
        income: [
          {
            label: "husband",
            value: 40000,
            budget_id: 1,
            budget_date_id: 1,
            frequency: "Monthly",
          },
        ],
        expense: [
          {
            label: "Netflix",
            value: 39.5,
            paid: false,
            budget_id: 2,
            budget_date_id: 1,
            frequency: "Monthly",
            cadence: " Current Month",
          },
        ],
      },
      {
        year: 2025,
        month: "february",
        income: [
          {
            label: "husband",
            value: 35000,
            budget_id: 3,
            budget_date_id: 2,
            frequency: "Monthly",
            cadence: "Future Months",
          },
        ],
        expense: [
          {
            label: "Netflix",
            value: 9.99,
            paid: false,
            budget_id: 4,
            budget_date_id: 2,
            frequency: "Monthly",
            cadence: "All Months",
          },
        ],
      },
      {
        year: 2025,
        month: "march",
        income: [
          {
            label: "husband",
            value: 35000,
            budget_id: 5,
            budget_date_id: 3,
            frequency: "Monthly",
            cadence: "Future Months",
          },
        ],
        expense: [
          {
            label: "Netflix",
            value: 19.99,
            paid: false,
            budget_id: 6,
            budget_date_id: 3,
          },
        ],
      },
      {
        year: 2025,
        month: "april",
        income: [
          {
            label: "husband",
            value: 35000,
            budget_id: 7,
            budget_date_id: 4,
            frequency: "Monthly",
            cadence: "Future Months",
          },
        ],
        expense: [
          {
            label: "Netflix",
            value: 19.99,
            paid: false,
            budget_id: 8,
            budget_date_id: 4,
          },
        ],
      },
      {
        year: 2025,
        month: "may",
        income: [
          {
            label: "husband",
            value: 35000,
            budget_id: 9,
            budget_date_id: 5,
            frequency: "Monthly",
            cadence: "Future Months",
          },
        ],
        expense: [
          {
            label: "Netflix",
            value: 19.99,
            paid: false,
            budget_id: 10,
            budget_date_id: 5,
          },
        ],
      },
      {
        year: 2025,
        month: "june",
        income: [
          {
            label: "husband",
            value: 35000,
            budget_id: 11,
            budget_date_id: 6,
            frequency: "Monthly",
            cadence: "Future Months",
          },
        ],
        expense: [
          {
            label: "Netflix",
            value: 19.99,
            paid: false,
            budget_id: 12,
            budget_date_id: 6,
          },
        ],
      },
      {
        year: 2025,
        month: "july",
        income: [
          {
            label: "husband",
            value: 35000,
            budget_id: 13,
            budget_date_id: 7,
            frequency: "Monthly",
            cadence: "Future Months",
          },
        ],
        expense: [
          {
            label: "Netflix",
            value: 19.99,
            paid: false,
            budget_id: 14,
            budget_date_id: 7,
          },
        ],
      },
      {
        year: 2025,
        month: "august",
        income: [
          {
            label: "husband",
            value: 35000,
            budget_id: 15,
            budget_date_id: 8,
            frequency: "Monthly",
            cadence: "Future Months",
          },
        ],
        expense: [
          {
            label: "Netflix",
            value: 19.99,
            paid: false,
            budget_id: 16,
            budget_date_id: 8,
          },
        ],
      },
      {
        year: 2025,
        month: "september",
        income: [
          {
            label: "husband",
            value: 35000,
            budget_id: 17,
            budget_date_id: 9,
            frequency: "Monthly",
            cadence: "Future Months",
          },
        ],
        expense: [
          {
            label: "Netflix",
            value: 19.99,
            paid: false,
            budget_id: 18,
            budget_date_id: 9,
          },
        ],
      },
      {
        year: 2025,
        month: "october",
        income: [
          {
            label: "husband",
            value: 35000,
            budget_id: 19,
            budget_date_id: 10,
            frequency: "Monthly",
            cadence: "Future Months",
          },
        ],
        expense: [
          {
            label: "Netflix",
            value: 19.99,
            paid: false,
            budget_id: 20,
            budget_date_id: 10,
          },
        ],
      },
      {
        year: 2025,
        month: "november",
        income: [
          {
            label: "husband",
            value: 35000,
            budget_id: 21,
            budget_date_id: 11,
            frequency: "Monthly",
            cadence: "Future Months",
          },
        ],
        expense: [
          {
            label: "Netflix",
            value: 19.99,
            paid: false,
            budget_id: 22,
            budget_date_id: 11,
          },
        ],
      },
      {
        year: 2025,
        month: "december",
        income: [
          {
            label: "husband",
            value: 35000,
            budget_id: 23,
            budget_date_id: 12,
            frequency: "Monthly",
            cadence: "Future Months",
          },
        ],
        expense: [
          {
            label: "Netflix",
            value: 19.99,
            paid: false,
            budget_id: 24,
            budget_date_id: 12,
          },
        ],
      },
    ];

    for (let i = 1; i <= 11; i++) {
      expect(JSON.stringify(budgetFull[i].income[0])).toBe(
        JSON.stringify(updatedBudget[i].income[0]),
      );
    }
  });

  test("should update all months", () => {
    updateBasedOnCadence(
      budgetFull[1],
      budgetFullUpdated[1].expense[0],
      budgetFull,
      budgetFull[1].expense[0],
      "february",
      2025,
      "expense",
    );

    const updatedBudget = [
      {
        year: 2025,
        month: "january",
        income: [
          {
            label: "husband",
            value: 40000,
            budget_id: 1,
            budget_date_id: 1,
            frequency: "Monthly",
          },
        ],
        expense: [
          {
            label: "Netflix",
            value: 9.99,
            paid: false,
            budget_id: 2,
            budget_date_id: 1,
            frequency: "Monthly",
            cadence: "All Months",
          },
        ],
      },
      {
        year: 2025,
        month: "february",
        income: [
          {
            label: "husband",
            value: 35000,
            budget_id: 3,
            budget_date_id: 2,
            frequency: "Monthly",
            cadence: "Future Months",
          },
        ],
        expense: [
          {
            label: "Netflix",
            value: 9.99,
            paid: false,
            budget_id: 4,
            budget_date_id: 2,
            frequency: "Monthly",
            cadence: "All Months",
          },
        ],
      },
      {
        year: 2025,
        month: "march",
        income: [
          {
            label: "husband",
            value: 35000,
            budget_id: 5,
            budget_date_id: 3,
            frequency: "Monthly",
            cadence: "Future Months",
          },
        ],
        expense: [
          {
            label: "Netflix",
            value: 9.99,
            paid: false,
            budget_id: 6,
            budget_date_id: 3,
            frequency: "Monthly",
            cadence: "All Months",
          },
        ],
      },
      {
        year: 2025,
        month: "april",
        income: [
          {
            label: "husband",
            value: 35000,
            budget_id: 7,
            budget_date_id: 4,
            frequency: "Monthly",
            cadence: "Future Months",
          },
        ],
        expense: [
          {
            label: "Netflix",
            value: 9.99,
            paid: false,
            budget_id: 8,
            budget_date_id: 4,
            frequency: "Monthly",
            cadence: "All Months",
          },
        ],
      },
      {
        year: 2025,
        month: "may",
        income: [
          {
            label: "husband",
            value: 35000,
            budget_id: 9,
            budget_date_id: 5,
            frequency: "Monthly",
            cadence: "Future Months",
          },
        ],
        expense: [
          {
            label: "Netflix",
            value: 9.99,
            paid: false,
            budget_id: 10,
            budget_date_id: 5,
            frequency: "Monthly",
            cadence: "All Months",
          },
        ],
      },
      {
        year: 2025,
        month: "june",
        income: [
          {
            label: "husband",
            value: 35000,
            budget_id: 11,
            budget_date_id: 6,
            frequency: "Monthly",
            cadence: "Future Months",
          },
        ],
        expense: [
          {
            label: "Netflix",
            value: 9.99,
            paid: false,
            budget_id: 12,
            budget_date_id: 6,
            frequency: "Monthly",
            cadence: "All Months",
          },
        ],
      },
      {
        year: 2025,
        month: "july",
        income: [
          {
            label: "husband",
            value: 35000,
            budget_id: 13,
            budget_date_id: 7,
            frequency: "Monthly",
            cadence: "Future Months",
          },
        ],
        expense: [
          {
            label: "Netflix",
            value: 9.99,
            paid: false,
            budget_id: 14,
            budget_date_id: 7,
            frequency: "Monthly",
            cadence: "All Months",
          },
        ],
      },
      {
        year: 2025,
        month: "august",
        income: [
          {
            label: "husband",
            value: 35000,
            budget_id: 15,
            budget_date_id: 8,
            frequency: "Monthly",
            cadence: "Future Months",
          },
        ],
        expense: [
          {
            label: "Netflix",
            value: 9.99,
            paid: false,
            budget_id: 16,
            budget_date_id: 8,
            frequency: "Monthly",
            cadence: "All Months",
          },
        ],
      },
      {
        year: 2025,
        month: "september",
        income: [
          {
            label: "husband",
            value: 35000,
            budget_id: 17,
            budget_date_id: 9,
            frequency: "Monthly",
            cadence: "Future Months",
          },
        ],
        expense: [
          {
            label: "Netflix",
            value: 9.99,
            paid: false,
            budget_id: 18,
            budget_date_id: 9,
            frequency: "Monthly",
            cadence: "All Months",
          },
        ],
      },
      {
        year: 2025,
        month: "october",
        income: [
          {
            label: "husband",
            value: 35000,
            budget_id: 19,
            budget_date_id: 10,
            frequency: "Monthly",
            cadence: "Future Months",
          },
        ],
        expense: [
          {
            label: "Netflix",
            value: 9.99,
            paid: false,
            budget_id: 20,
            budget_date_id: 10,
            frequency: "Monthly",
            cadence: "All Months",
          },
        ],
      },
      {
        year: 2025,
        month: "november",
        income: [
          {
            label: "husband",
            value: 35000,
            budget_id: 21,
            budget_date_id: 11,
            frequency: "Monthly",
            cadence: "Future Months",
          },
        ],
        expense: [
          {
            label: "Netflix",
            value: 9.99,
            paid: false,
            budget_id: 22,
            budget_date_id: 11,
            frequency: "Monthly",
            cadence: "All Months",
          },
        ],
      },
      {
        year: 2025,
        month: "december",
        income: [
          {
            label: "husband",
            value: 35000,
            budget_id: 23,
            budget_date_id: 12,
            frequency: "Monthly",
            cadence: "Future Months",
          },
        ],
        expense: [
          {
            label: "Netflix",
            value: 9.99,
            paid: false,
            budget_id: 24,
            budget_date_id: 12,
            frequency: "Monthly",
            cadence: "All Months",
          },
        ],
      },
    ];

    for (let i = 0; i <= 11; i++) {
      expect(JSON.stringify(budgetFull[i].expense[0])).toBe(
        JSON.stringify(updatedBudget[i].expense[0]),
      );
    }
  });

  test("should update quarter months", () => {
    updateBasedOnCadence(
      budgetFull[2],
      budgetFullUpdated[2].income[0],
      budgetFull,
      budgetFull[2].income[0],
      "march",
      2025,
      "income",
    );

    const updatedBudget = [
      {
        year: 2025,
        month: "january",
        income: [
          {
            label: "husband",
            value: 40000,
            budget_id: 1,
            budget_date_id: 1,
          },
        ],
        expense: [
          {
            label: "Netflix",
            value: 19.99,
            paid: false,
            budget_id: 2,
            budget_date_id: 1,
          },
        ],
      },
      {
        year: 2025,
        month: "february",
        income: [
          {
            label: "husband",
            value: 40000,
            budget_id: 3,
            budget_date_id: 2,
          },
        ],
        expense: [
          {
            label: "Netflix",
            value: 19.99,
            paid: false,
            budget_id: 4,
            budget_date_id: 2,
          },
        ],
      },
      {
        year: 2025,
        month: "march",
        income: [
          {
            label: "husband",
            value: 20000,
            budget_id: 5,
            budget_date_id: 3,
            frequency: "Quarterly",
            cadence: "All Months",
          },
        ],
        expense: [
          {
            label: "Netflix",
            value: 19.99,
            paid: false,
            budget_id: 6,
            budget_date_id: 3,
          },
        ],
      },
      {
        year: 2025,
        month: "april",
        income: [
          {
            label: "husband",
            value: 40000,
            budget_id: 7,
            budget_date_id: 4,
          },
        ],
        expense: [
          {
            label: "Netflix",
            value: 19.99,
            paid: false,
            budget_id: 8,
            budget_date_id: 4,
          },
        ],
      },
      {
        year: 2025,
        month: "may",
        income: [
          {
            label: "husband",
            value: 40000,
            budget_id: 9,
            budget_date_id: 5,
          },
        ],
        expense: [
          {
            label: "Netflix",
            value: 19.99,
            paid: false,
            budget_id: 10,
            budget_date_id: 5,
          },
        ],
      },
      {
        year: 2025,
        month: "june",
        income: [
          {
            label: "husband",
            value: 20000,
            budget_id: 11,
            budget_date_id: 6,
            frequency: "Quarterly",
            cadence: "All Months",
          },
        ],
        expense: [
          {
            label: "Netflix",
            value: 19.99,
            paid: false,
            budget_id: 12,
            budget_date_id: 6,
          },
        ],
      },
      {
        year: 2025,
        month: "july",
        income: [
          {
            label: "husband",
            value: 40000,
            budget_id: 13,
            budget_date_id: 7,
          },
        ],
        expense: [
          {
            label: "Netflix",
            value: 19.99,
            paid: false,
            budget_id: 14,
            budget_date_id: 7,
          },
        ],
      },
      {
        year: 2025,
        month: "august",
        income: [
          {
            label: "husband",
            value: 40000,
            budget_id: 15,
            budget_date_id: 8,
          },
        ],
        expense: [
          {
            label: "Netflix",
            value: 19.99,
            paid: false,
            budget_id: 16,
            budget_date_id: 8,
          },
        ],
      },
      {
        year: 2025,
        month: "september",
        income: [
          {
            label: "husband",
            value: 20000,
            budget_id: 17,
            budget_date_id: 9,
            frequency: "Quarterly",
            cadence: "All Months",
          },
        ],
        expense: [
          {
            label: "Netflix",
            value: 19.99,
            paid: false,
            budget_id: 18,
            budget_date_id: 9,
          },
        ],
      },
      {
        year: 2025,
        month: "october",
        income: [
          {
            label: "husband",
            value: 40000,
            budget_id: 19,
            budget_date_id: 10,
          },
        ],
        expense: [
          {
            label: "Netflix",
            value: 19.99,
            paid: false,
            budget_id: 20,
            budget_date_id: 10,
          },
        ],
      },
      {
        year: 2025,
        month: "november",
        income: [
          {
            label: "husband",
            value: 40000,
            budget_id: 21,
            budget_date_id: 11,
          },
        ],
        expense: [
          {
            label: "Netflix",
            value: 19.99,
            paid: false,
            budget_id: 22,
            budget_date_id: 11,
          },
        ],
      },
      {
        year: 2025,
        month: "december",
        income: [
          {
            label: "husband",
            value: 20000,
            budget_id: 23,
            budget_date_id: 12,
            frequency: "Quarterly",
            cadence: "All Months",
          },
        ],
        expense: [
          {
            label: "Netflix",
            value: 19.99,
            paid: false,
            budget_id: 24,
            budget_date_id: 12,
          },
        ],
      },
    ];

    for (let i = 0; i <= 11; i++) {
      expect(JSON.stringify(budgetFull[i].income[0])).toBe(
        JSON.stringify(updatedBudget[i].income[0]),
      );
    }
  });
});

describe("insertBasedOnCadence", () => {
  test("should update current month if no cadence is selected", () => {
    insertBasedOnCadence(
      budgetFull[0],
      budgetFullInserted[0].income[1],
      budgetFull,
      "january",
      2025,
      "income",
    );

    expect(JSON.stringify(budgetFull[0].income[1])).toBe(
      JSON.stringify(budgetFullInserted[0].income[1]),
    );
  });

  test("should update current month", () => {
    insertBasedOnCadence(
      budgetFull[0],
      budgetFullInserted[0].expense[1],
      budgetFull,
      "january",
      2025,
      "expense",
    );

    expect(JSON.stringify(budgetFull[0].expense[1])).toBe(
      JSON.stringify(budgetFullInserted[0].expense[1]),
    );
  });

  test("should update future months", () => {
    insertBasedOnCadence(
      budgetFull[1],
      budgetFullInserted[1].income[1],
      budgetFull,
      "february",
      2025,
      "income",
    );

    const insertedBudget = [
      {
        year: 2025,
        month: "january",
        income: [
          {
            label: "husband",
            value: 55000,
            budget_id: 1,
            budget_date_id: 1,
            frequency: "Monthly",
          },
          {
            label: "wife",
            value: 75000,
            budget_id: null,
            budget_date_id: 1,
            frequency: "Monthly",
          },
        ],
        expense: [
          {
            label: "Netflix",
            value: 39.5,
            paid: false,
            budget_id: 2,
            budget_date_id: 1,
            frequency: "Monthly",
            cadence: "Current Month",
          },
          {
            label: "Hulu",
            value: 20,
            paid: false,
            budget_id: null,
            budget_date_id: 1,
            frequency: "Monthly",
            cadence: "Current Month",
          },
        ],
      },
      {
        year: 2025,
        month: "february",
        income: [
          {
            label: "husband",
            value: 35000,
            budget_id: 3,
            budget_date_id: 2,
            frequency: "Monthly",
            cadence: "Future Months",
          },
          {
            label: "wife",
            value: 55000,
            budget_id: null,
            budget_date_id: 2,
            frequency: "Monthly",
            cadence: "Future Months",
          },
        ],
        expense: [
          {
            label: "Netflix",
            value: 9.99,
            paid: false,
            budget_id: 4,
            budget_date_id: 2,
            frequency: "Monthly",
            cadence: "All Months",
          },
        ],
      },
      {
        year: 2025,
        month: "march",
        income: [
          {
            label: "husband",
            value: 20000,
            budget_id: 5,
            budget_date_id: 3,
            frequency: "Quarterly",
            cadence: "All Months",
          },
          {
            label: "wife",
            value: 55000,
            budget_id: null,
            budget_date_id: 2,
            frequency: "Monthly",
            cadence: "Future Months",
          },
        ],
        expense: [
          {
            label: "Netflix",
            value: 19.99,
            paid: false,
            budget_id: 6,
            budget_date_id: 3,
          },
        ],
      },
      {
        year: 2025,
        month: "april",
        income: [
          {
            label: "husband",
            value: 40000,
            budget_id: 7,
            budget_date_id: 4,
          },
          {
            label: "wife",
            value: 55000,
            budget_id: null,
            budget_date_id: 2,
            frequency: "Monthly",
            cadence: "Future Months",
          },
        ],
        expense: [
          {
            label: "Netflix",
            value: 19.99,
            paid: false,
            budget_id: 8,
            budget_date_id: 4,
          },
        ],
      },
      {
        year: 2025,
        month: "may",
        income: [
          {
            label: "husband",
            value: 40000,
            budget_id: 9,
            budget_date_id: 5,
          },
          {
            label: "wife",
            value: 55000,
            budget_id: null,
            budget_date_id: 2,
            frequency: "Monthly",
            cadence: "Future Months",
          },
        ],
        expense: [
          {
            label: "Netflix",
            value: 19.99,
            paid: false,
            budget_id: 10,
            budget_date_id: 5,
          },
        ],
      },
      {
        year: 2025,
        month: "june",
        income: [
          {
            label: "husband",
            value: 40000,
            budget_id: 11,
            budget_date_id: 6,
          },
          {
            label: "wife",
            value: 55000,
            budget_id: null,
            budget_date_id: 2,
            frequency: "Monthly",
            cadence: "Future Months",
          },
        ],
        expense: [
          {
            label: "Netflix",
            value: 19.99,
            paid: false,
            budget_id: 12,
            budget_date_id: 6,
          },
        ],
      },
      {
        year: 2025,
        month: "july",
        income: [
          {
            label: "husband",
            value: 40000,
            budget_id: 13,
            budget_date_id: 7,
          },
          {
            label: "wife",
            value: 55000,
            budget_id: null,
            budget_date_id: 2,
            frequency: "Monthly",
            cadence: "Future Months",
          },
        ],
        expense: [
          {
            label: "Netflix",
            value: 19.99,
            paid: false,
            budget_id: 14,
            budget_date_id: 7,
          },
        ],
      },
      {
        year: 2025,
        month: "august",
        income: [
          {
            label: "husband",
            value: 40000,
            budget_id: 15,
            budget_date_id: 8,
          },
          {
            label: "wife",
            value: 55000,
            budget_id: null,
            budget_date_id: 2,
            frequency: "Monthly",
            cadence: "Future Months",
          },
        ],
        expense: [
          {
            label: "Netflix",
            value: 19.99,
            paid: false,
            budget_id: 16,
            budget_date_id: 8,
          },
        ],
      },
      {
        year: 2025,
        month: "september",
        income: [
          {
            label: "husband",
            value: 40000,
            budget_id: 17,
            budget_date_id: 9,
          },
          {
            label: "wife",
            value: 55000,
            budget_id: null,
            budget_date_id: 2,
            frequency: "Monthly",
            cadence: "Future Months",
          },
        ],
        expense: [
          {
            label: "Netflix",
            value: 19.99,
            paid: false,
            budget_id: 18,
            budget_date_id: 9,
          },
        ],
      },
      {
        year: 2025,
        month: "october",
        income: [
          {
            label: "husband",
            value: 40000,
            budget_id: 19,
            budget_date_id: 10,
          },
          {
            label: "wife",
            value: 55000,
            budget_id: null,
            budget_date_id: 2,
            frequency: "Monthly",
            cadence: "Future Months",
          },
        ],
        expense: [
          {
            label: "Netflix",
            value: 19.99,
            paid: false,
            budget_id: 20,
            budget_date_id: 10,
          },
        ],
      },
      {
        year: 2025,
        month: "november",
        income: [
          {
            label: "husband",
            value: 40000,
            budget_id: 21,
            budget_date_id: 11,
          },
          {
            label: "wife",
            value: 55000,
            budget_id: null,
            budget_date_id: 2,
            frequency: "Monthly",
            cadence: "Future Months",
          },
        ],
        expense: [
          {
            label: "Netflix",
            value: 19.99,
            paid: false,
            budget_id: 22,
            budget_date_id: 11,
          },
        ],
      },
      {
        year: 2025,
        month: "december",
        income: [
          {
            label: "husband",
            value: 40000,
            budget_id: 23,
            budget_date_id: 12,
          },
          {
            label: "wife",
            value: 55000,
            budget_id: null,
            budget_date_id: 2,
            frequency: "Monthly",
            cadence: "Future Months",
          },
        ],
        expense: [
          {
            label: "Netflix",
            value: 19.99,
            paid: false,
            budget_id: 24,
            budget_date_id: 12,
          },
        ],
      },
    ];

    for (let i = 1; i <= 11; i++) {
      expect(JSON.stringify(budgetFull[i].income[1])).toBe(
        JSON.stringify(insertedBudget[i].income[1]),
      );
    }
  });

  test("should update all months", () => {
    insertBasedOnCadence(
      budgetFull[1],
      budgetFullInserted[1].expense[1],
      budgetFull,
      "february",
      2025,
      "expense",
    );

    const insertedBudget = [
      {
        year: 2025,
        month: "january",
        income: [
          {
            label: "husband",
            value: 55000,
            budget_id: 1,
            budget_date_id: 1,
            frequency: "Monthly",
          },
          {
            label: "wife",
            value: 75000,
            budget_id: null,
            budget_date_id: 1,
            frequency: "Monthly",
          },
        ],
        expense: [
          {
            label: "Netflix",
            value: 39.5,
            paid: false,
            budget_id: 2,
            budget_date_id: 1,
            frequency: "Monthly",
            cadence: "Current Month",
          },
          {
            label: "Hulu",
            value: 12,
            paid: false,
            budget_id: null,
            budget_date_id: 2,
            frequency: "Monthly",
            cadence: "All Months",
          },
        ],
      },
      {
        year: 2025,
        month: "february",
        income: [
          {
            label: "husband",
            value: 35000,
            budget_id: 3,
            budget_date_id: 2,
            frequency: "Monthly",
            cadence: "Future Months",
          },
          {
            label: "wife",
            value: 55000,
            budget_id: null,
            budget_date_id: 2,
            frequency: "Monthly",
            cadence: "Future Months",
          },
        ],
        expense: [
          {
            label: "Netflix",
            value: 9.99,
            paid: false,
            budget_id: 4,
            budget_date_id: 2,
            frequency: "Monthly",
            cadence: "All Months",
          },
          {
            label: "Hulu",
            value: 12,
            paid: false,
            budget_id: null,
            budget_date_id: 2,
            frequency: "Monthly",
            cadence: "All Months",
          },
        ],
      },
      {
        year: 2025,
        month: "march",
        income: [
          {
            label: "husband",
            value: 20000,
            budget_id: 5,
            budget_date_id: 3,
            frequency: "Quarterly",
            cadence: "All Months",
          },
        ],
        expense: [
          {
            label: "Netflix",
            value: 19.99,
            paid: false,
            budget_id: 6,
            budget_date_id: 3,
          },
          {
            label: "Hulu",
            value: 12,
            paid: false,
            budget_id: null,
            budget_date_id: 2,
            frequency: "Monthly",
            cadence: "All Months",
          },
        ],
      },
      {
        year: 2025,
        month: "april",
        income: [
          {
            label: "husband",
            value: 40000,
            budget_id: 7,
            budget_date_id: 4,
          },
        ],
        expense: [
          {
            label: "Netflix",
            value: 19.99,
            paid: false,
            budget_id: 8,
            budget_date_id: 4,
          },
          {
            label: "Hulu",
            value: 12,
            paid: false,
            budget_id: null,
            budget_date_id: 2,
            frequency: "Monthly",
            cadence: "All Months",
          },
        ],
      },
      {
        year: 2025,
        month: "may",
        income: [
          {
            label: "husband",
            value: 40000,
            budget_id: 9,
            budget_date_id: 5,
          },
        ],
        expense: [
          {
            label: "Netflix",
            value: 19.99,
            paid: false,
            budget_id: 10,
            budget_date_id: 5,
          },
          {
            label: "Hulu",
            value: 12,
            paid: false,
            budget_id: null,
            budget_date_id: 2,
            frequency: "Monthly",
            cadence: "All Months",
          },
        ],
      },
      {
        year: 2025,
        month: "june",
        income: [
          {
            label: "husband",
            value: 40000,
            budget_id: 11,
            budget_date_id: 6,
          },
        ],
        expense: [
          {
            label: "Netflix",
            value: 19.99,
            paid: false,
            budget_id: 12,
            budget_date_id: 6,
          },
          {
            label: "Hulu",
            value: 12,
            paid: false,
            budget_id: null,
            budget_date_id: 2,
            frequency: "Monthly",
            cadence: "All Months",
          },
        ],
      },
      {
        year: 2025,
        month: "july",
        income: [
          {
            label: "husband",
            value: 40000,
            budget_id: 13,
            budget_date_id: 7,
          },
        ],
        expense: [
          {
            label: "Netflix",
            value: 19.99,
            paid: false,
            budget_id: 14,
            budget_date_id: 7,
          },
          {
            label: "Hulu",
            value: 12,
            paid: false,
            budget_id: null,
            budget_date_id: 2,
            frequency: "Monthly",
            cadence: "All Months",
          },
        ],
      },
      {
        year: 2025,
        month: "august",
        income: [
          {
            label: "husband",
            value: 40000,
            budget_id: 15,
            budget_date_id: 8,
          },
        ],
        expense: [
          {
            label: "Netflix",
            value: 19.99,
            paid: false,
            budget_id: 16,
            budget_date_id: 8,
          },
          {
            label: "Hulu",
            value: 12,
            paid: false,
            budget_id: null,
            budget_date_id: 2,
            frequency: "Monthly",
            cadence: "All Months",
          },
        ],
      },
      {
        year: 2025,
        month: "september",
        income: [
          {
            label: "husband",
            value: 40000,
            budget_id: 17,
            budget_date_id: 9,
          },
        ],
        expense: [
          {
            label: "Netflix",
            value: 19.99,
            paid: false,
            budget_id: 18,
            budget_date_id: 9,
          },
          {
            label: "Hulu",
            value: 12,
            paid: false,
            budget_id: null,
            budget_date_id: 2,
            frequency: "Monthly",
            cadence: "All Months",
          },
        ],
      },
      {
        year: 2025,
        month: "october",
        income: [
          {
            label: "husband",
            value: 40000,
            budget_id: 19,
            budget_date_id: 10,
          },
        ],
        expense: [
          {
            label: "Netflix",
            value: 19.99,
            paid: false,
            budget_id: 20,
            budget_date_id: 10,
          },
          {
            label: "Hulu",
            value: 12,
            paid: false,
            budget_id: null,
            budget_date_id: 2,
            frequency: "Monthly",
            cadence: "All Months",
          },
        ],
      },
      {
        year: 2025,
        month: "november",
        income: [
          {
            label: "husband",
            value: 40000,
            budget_id: 21,
            budget_date_id: 11,
          },
        ],
        expense: [
          {
            label: "Netflix",
            value: 19.99,
            paid: false,
            budget_id: 22,
            budget_date_id: 11,
          },
          {
            label: "Hulu",
            value: 12,
            paid: false,
            budget_id: null,
            budget_date_id: 2,
            frequency: "Monthly",
            cadence: "All Months",
          },
        ],
      },
      {
        year: 2025,
        month: "december",
        income: [
          {
            label: "husband",
            value: 40000,
            budget_id: 23,
            budget_date_id: 12,
          },
        ],
        expense: [
          {
            label: "Netflix",
            value: 19.99,
            paid: false,
            budget_id: 24,
            budget_date_id: 12,
          },
          {
            label: "Hulu",
            value: 12,
            paid: false,
            budget_id: null,
            budget_date_id: 2,
            frequency: "Monthly",
            cadence: "All Months",
          },
        ],
      },
    ];

    for (let i = 0; i <= 11; i++) {
      expect(JSON.stringify(budgetFull[i].expense[1])).toBe(
        JSON.stringify(insertedBudget[i].expense[1]),
      );
    }
  });

  test("should update quarter months", () => {
    insertBasedOnCadence(
      budgetFull[2],
      budgetFullInserted[2].income[1],
      budgetFull,
      "march",
      2025,
      "income",
    );

    const insertedBudget = [
      {
        year: 2025,
        month: "january",
        income: [
          {
            label: "husband",
            value: 40000,
            budget_id: 1,
            budget_date_id: 1,
          },
        ],
        expense: [
          {
            label: "Netflix",
            value: 19.99,
            paid: false,
            budget_id: 2,
            budget_date_id: 1,
          },
        ],
      },
      {
        year: 2025,
        month: "february",
        income: [
          {
            label: "husband",
            value: 40000,
            budget_id: 3,
            budget_date_id: 2,
          },
        ],
        expense: [
          {
            label: "Netflix",
            value: 19.99,
            paid: false,
            budget_id: 4,
            budget_date_id: 2,
          },
        ],
      },
      {
        year: 2025,
        month: "march",
        income: [
          {
            label: "husband",
            value: 40000,
            budget_id: 5,
            budget_date_id: 3,
          },
          {
            label: "wife",
            value: 35000,
            budget_id: null,
            budget_date_id: 3,
            frequency: "Quarterly",
            cadence: "All Months",
          },
        ],
        expense: [
          {
            label: "Netflix",
            value: 19.99,
            paid: false,
            budget_id: 6,
            budget_date_id: 3,
          },
        ],
      },
      {
        year: 2025,
        month: "april",
        income: [
          {
            label: "husband",
            value: 40000,
            budget_id: 7,
            budget_date_id: 4,
          },
        ],
        expense: [
          {
            label: "Netflix",
            value: 19.99,
            paid: false,
            budget_id: 8,
            budget_date_id: 4,
          },
        ],
      },
      {
        year: 2025,
        month: "may",
        income: [
          {
            label: "husband",
            value: 40000,
            budget_id: 9,
            budget_date_id: 5,
          },
        ],
        expense: [
          {
            label: "Netflix",
            value: 19.99,
            paid: false,
            budget_id: 10,
            budget_date_id: 5,
          },
        ],
      },
      {
        year: 2025,
        month: "june",
        income: [
          {
            label: "husband",
            value: 40000,
            budget_id: 11,
            budget_date_id: 6,
          },
          {
            label: "wife",
            value: 35000,
            budget_id: null,
            budget_date_id: 3,
            frequency: "Quarterly",
            cadence: "All Months",
          },
        ],
        expense: [
          {
            label: "Netflix",
            value: 19.99,
            paid: false,
            budget_id: 12,
            budget_date_id: 6,
          },
        ],
      },
      {
        year: 2025,
        month: "july",
        income: [
          {
            label: "husband",
            value: 40000,
            budget_id: 13,
            budget_date_id: 7,
          },
        ],
        expense: [
          {
            label: "Netflix",
            value: 19.99,
            paid: false,
            budget_id: 14,
            budget_date_id: 7,
          },
        ],
      },
      {
        year: 2025,
        month: "august",
        income: [
          {
            label: "husband",
            value: 40000,
            budget_id: 15,
            budget_date_id: 8,
          },
        ],
        expense: [
          {
            label: "Netflix",
            value: 19.99,
            paid: false,
            budget_id: 16,
            budget_date_id: 8,
          },
        ],
      },
      {
        year: 2025,
        month: "september",
        income: [
          {
            label: "husband",
            value: 40000,
            budget_id: 17,
            budget_date_id: 9,
          },
          {
            label: "wife",
            value: 35000,
            budget_id: null,
            budget_date_id: 3,
            frequency: "Quarterly",
            cadence: "All Months",
          },
        ],
        expense: [
          {
            label: "Netflix",
            value: 19.99,
            paid: false,
            budget_id: 18,
            budget_date_id: 9,
          },
        ],
      },
      {
        year: 2025,
        month: "october",
        income: [
          {
            label: "husband",
            value: 40000,
            budget_id: 19,
            budget_date_id: 10,
          },
        ],
        expense: [
          {
            label: "Netflix",
            value: 19.99,
            paid: false,
            budget_id: 20,
            budget_date_id: 10,
          },
        ],
      },
      {
        year: 2025,
        month: "november",
        income: [
          {
            label: "husband",
            value: 40000,
            budget_id: 21,
            budget_date_id: 11,
          },
        ],
        expense: [
          {
            label: "Netflix",
            value: 19.99,
            paid: false,
            budget_id: 22,
            budget_date_id: 11,
          },
        ],
      },
      {
        year: 2025,
        month: "december",
        income: [
          {
            label: "husband",
            value: 40000,
            budget_id: 23,
            budget_date_id: 12,
          },
          {
            label: "wife",
            value: 35000,
            budget_id: null,
            budget_date_id: 3,
            frequency: "Quarterly",
            cadence: "All Months",
          },
        ],
        expense: [
          {
            label: "Netflix",
            value: 19.99,
            paid: false,
            budget_id: 24,
            budget_date_id: 12,
          },
        ],
      },
    ];

    for (let i = 0; i <= 11; i++) {
      expect(JSON.stringify(budgetFull[i].income[1])).toBe(
        JSON.stringify(insertedBudget[i].income[1]),
      );
    }
  });
});

describe("insertBudgetIds", () => {
  test("should update current month with budget_ids", () => {
    insertBudgetIds(
      budgetFullInserted[0],
      budgetFullInserted[0].income[1],
      budgetFull,
      "january",
      2025,
      "income",
      { budget_id: 25 },
    );

    expect(budgetFullInserted[0].income[1].budget_id).toBe(25);
  });

  test("should update future months", () => {
    insertBudgetIds(
      budgetFullInserted[1],
      budgetFullInserted[1].income[1],
      budgetFullInserted,
      "february",
      2025,
      "income",
      { budget_id: [25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35] },
    );

    const insertedBudget = [
      {
        year: 2025,
        month: "january",
        income: [
          {
            label: "husband",
            value: 55000,
            budget_id: 1,
            budget_date_id: 1,
            frequency: "Monthly",
          },
          {
            label: "wife",
            value: 75000,
            budget_id: null,
            budget_date_id: 1,
            frequency: "Monthly",
          },
        ],
        expense: [
          {
            label: "Netflix",
            value: 39.5,
            paid: false,
            budget_id: 2,
            budget_date_id: 1,
            frequency: "Monthly",
            cadence: "Current Month",
          },
          {
            label: "Hulu",
            value: 20,
            paid: false,
            budget_id: null,
            budget_date_id: 1,
            frequency: "Monthly",
            cadence: "Current Month",
          },
        ],
      },
      {
        year: 2025,
        month: "february",
        income: [
          {
            label: "husband",
            value: 35000,
            budget_id: 3,
            budget_date_id: 2,
            frequency: "Monthly",
            cadence: "Future Months",
          },
          {
            label: "wife",
            value: 55000,
            budget_id: 25,
            budget_date_id: 2,
            frequency: "Monthly",
            cadence: "Future Months",
          },
        ],
        expense: [
          {
            label: "Netflix",
            value: 9.99,
            paid: false,
            budget_id: 4,
            budget_date_id: 2,
            frequency: "Monthly",
            cadence: "All Months",
          },
        ],
      },
      {
        year: 2025,
        month: "march",
        income: [
          {
            label: "husband",
            value: 20000,
            budget_id: 5,
            budget_date_id: 3,
            frequency: "Quarterly",
            cadence: "All Months",
          },
          {
            label: "wife",
            value: 55000,
            budget_id: 26,
            budget_date_id: 3,
            frequency: "Monthly",
            cadence: "Future Months",
          },
        ],
        expense: [
          {
            label: "Netflix",
            value: 19.99,
            paid: false,
            budget_id: 6,
            budget_date_id: 3,
          },
        ],
      },
      {
        year: 2025,
        month: "april",
        income: [
          {
            label: "husband",
            value: 40000,
            budget_id: 7,
            budget_date_id: 4,
          },
          {
            label: "wife",
            value: 55000,
            budget_id: 27,
            budget_date_id: 4,
            frequency: "Monthly",
            cadence: "Future Months",
          },
        ],
        expense: [
          {
            label: "Netflix",
            value: 19.99,
            paid: false,
            budget_id: 8,
            budget_date_id: 4,
          },
        ],
      },
      {
        year: 2025,
        month: "may",
        income: [
          {
            label: "husband",
            value: 40000,
            budget_id: 9,
            budget_date_id: 5,
          },
          {
            label: "wife",
            value: 55000,
            budget_id: 28,
            budget_date_id: 5,
            frequency: "Monthly",
            cadence: "Future Months",
          },
        ],
        expense: [
          {
            label: "Netflix",
            value: 19.99,
            paid: false,
            budget_id: 10,
            budget_date_id: 5,
          },
        ],
      },
      {
        year: 2025,
        month: "june",
        income: [
          {
            label: "husband",
            value: 40000,
            budget_id: 11,
            budget_date_id: 6,
          },
          {
            label: "wife",
            value: 55000,
            budget_id: 29,
            budget_date_id: 6,
            frequency: "Monthly",
            cadence: "Future Months",
          },
        ],
        expense: [
          {
            label: "Netflix",
            value: 19.99,
            paid: false,
            budget_id: 12,
            budget_date_id: 6,
          },
        ],
      },
      {
        year: 2025,
        month: "july",
        income: [
          {
            label: "husband",
            value: 40000,
            budget_id: 13,
            budget_date_id: 7,
          },
          {
            label: "wife",
            value: 55000,
            budget_id: 30,
            budget_date_id: 7,
            frequency: "Monthly",
            cadence: "Future Months",
          },
        ],
        expense: [
          {
            label: "Netflix",
            value: 19.99,
            paid: false,
            budget_id: 14,
            budget_date_id: 7,
          },
        ],
      },
      {
        year: 2025,
        month: "august",
        income: [
          {
            label: "husband",
            value: 40000,
            budget_id: 15,
            budget_date_id: 8,
          },
          {
            label: "wife",
            value: 55000,
            budget_id: 31,
            budget_date_id: 8,
            frequency: "Monthly",
            cadence: "Future Months",
          },
        ],
        expense: [
          {
            label: "Netflix",
            value: 19.99,
            paid: false,
            budget_id: 16,
            budget_date_id: 8,
          },
        ],
      },
      {
        year: 2025,
        month: "september",
        income: [
          {
            label: "husband",
            value: 40000,
            budget_id: 17,
            budget_date_id: 9,
          },
          {
            label: "wife",
            value: 55000,
            budget_id: 32,
            budget_date_id: 9,
            frequency: "Monthly",
            cadence: "Future Months",
          },
        ],
        expense: [
          {
            label: "Netflix",
            value: 19.99,
            paid: false,
            budget_id: 18,
            budget_date_id: 9,
          },
        ],
      },
      {
        year: 2025,
        month: "october",
        income: [
          {
            label: "husband",
            value: 40000,
            budget_id: 19,
            budget_date_id: 10,
          },
          {
            label: "wife",
            value: 55000,
            budget_id: 33,
            budget_date_id: 10,
            frequency: "Monthly",
            cadence: "Future Months",
          },
        ],
        expense: [
          {
            label: "Netflix",
            value: 19.99,
            paid: false,
            budget_id: 20,
            budget_date_id: 10,
          },
        ],
      },
      {
        year: 2025,
        month: "november",
        income: [
          {
            label: "husband",
            value: 40000,
            budget_id: 21,
            budget_date_id: 11,
          },
          {
            label: "wife",
            value: 55000,
            budget_id: 34,
            budget_date_id: 11,
            frequency: "Monthly",
            cadence: "Future Months",
          },
        ],
        expense: [
          {
            label: "Netflix",
            value: 19.99,
            paid: false,
            budget_id: 22,
            budget_date_id: 11,
          },
        ],
      },
      {
        year: 2025,
        month: "december",
        income: [
          {
            label: "husband",
            value: 40000,
            budget_id: 23,
            budget_date_id: 12,
          },
          {
            label: "wife",
            value: 55000,
            budget_id: 35,
            budget_date_id: 12,
            frequency: "Monthly",
            cadence: "Future Months",
          },
        ],
        expense: [
          {
            label: "Netflix",
            value: 19.99,
            paid: false,
            budget_id: 24,
            budget_date_id: 12,
          },
        ],
      },
    ];

    for (let i = 1; i <= 11; i++) {
      expect(JSON.stringify(budgetFullInserted[i].income[1])).toBe(
        JSON.stringify(insertedBudget[i].income[1]),
      );
    }
  });

  test("should update all months", () => {
    insertBudgetIds(
      budgetFullInserted[1],
      budgetFullInserted[1].expense[1],
      budgetFullInserted,
      "february",
      2025,
      "expense",
      { budget_id: [25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36] },
    );

    const insertedBudget = [
      {
        year: 2025,
        month: "january",
        income: [
          {
            label: "husband",
            value: 55000,
            budget_id: 1,
            budget_date_id: 1,
            frequency: "Monthly",
          },
          {
            label: "wife",
            value: 75000,
            budget_id: null,
            budget_date_id: 1,
            frequency: "Monthly",
          },
        ],
        expense: [
          {
            label: "Netflix",
            value: 39.5,
            paid: false,
            budget_id: 2,
            budget_date_id: 1,
            frequency: "Monthly",
            cadence: "Current Month",
          },
          {
            label: "Hulu",
            value: 12,
            paid: false,
            budget_id: 25,
            budget_date_id: 1,
            frequency: "Monthly",
            cadence: "All Months",
          },
        ],
      },
      {
        year: 2025,
        month: "february",
        income: [
          {
            label: "husband",
            value: 35000,
            budget_id: 3,
            budget_date_id: 2,
            frequency: "Monthly",
            cadence: "Future Months",
          },
          {
            label: "wife",
            value: 55000,
            budget_id: null,
            budget_date_id: 2,
            frequency: "Monthly",
            cadence: "Future Months",
          },
        ],
        expense: [
          {
            label: "Netflix",
            value: 9.99,
            paid: false,
            budget_id: 4,
            budget_date_id: 2,
            frequency: "Monthly",
            cadence: "All Months",
          },
          {
            label: "Hulu",
            value: 12,
            paid: false,
            budget_id: 26,
            budget_date_id: 2,
            frequency: "Monthly",
            cadence: "All Months",
          },
        ],
      },
      {
        year: 2025,
        month: "march",
        income: [
          {
            label: "husband",
            value: 20000,
            budget_id: 5,
            budget_date_id: 3,
            frequency: "Quarterly",
            cadence: "All Months",
          },
        ],
        expense: [
          {
            label: "Netflix",
            value: 19.99,
            paid: false,
            budget_id: 6,
            budget_date_id: 3,
          },
          {
            label: "Hulu",
            value: 12,
            paid: false,
            budget_id: 27,
            budget_date_id: 3,
            frequency: "Monthly",
            cadence: "All Months",
          },
        ],
      },
      {
        year: 2025,
        month: "april",
        income: [
          {
            label: "husband",
            value: 40000,
            budget_id: 7,
            budget_date_id: 4,
          },
        ],
        expense: [
          {
            label: "Netflix",
            value: 19.99,
            paid: false,
            budget_id: 8,
            budget_date_id: 4,
          },
          {
            label: "Hulu",
            value: 12,
            paid: false,
            budget_id: 28,
            budget_date_id: 4,
            frequency: "Monthly",
            cadence: "All Months",
          },
        ],
      },
      {
        year: 2025,
        month: "may",
        income: [
          {
            label: "husband",
            value: 40000,
            budget_id: 9,
            budget_date_id: 5,
          },
        ],
        expense: [
          {
            label: "Netflix",
            value: 19.99,
            paid: false,
            budget_id: 10,
            budget_date_id: 5,
          },
          {
            label: "Hulu",
            value: 12,
            paid: false,
            budget_id: 29,
            budget_date_id: 5,
            frequency: "Monthly",
            cadence: "All Months",
          },
        ],
      },
      {
        year: 2025,
        month: "june",
        income: [
          {
            label: "husband",
            value: 40000,
            budget_id: 11,
            budget_date_id: 6,
          },
        ],
        expense: [
          {
            label: "Netflix",
            value: 19.99,
            paid: false,
            budget_id: 12,
            budget_date_id: 6,
          },
          {
            label: "Hulu",
            value: 12,
            paid: false,
            budget_id: 30,
            budget_date_id: 6,
            frequency: "Monthly",
            cadence: "All Months",
          },
        ],
      },
      {
        year: 2025,
        month: "july",
        income: [
          {
            label: "husband",
            value: 40000,
            budget_id: 13,
            budget_date_id: 7,
          },
        ],
        expense: [
          {
            label: "Netflix",
            value: 19.99,
            paid: false,
            budget_id: 14,
            budget_date_id: 7,
          },
          {
            label: "Hulu",
            value: 12,
            paid: false,
            budget_id: 31,
            budget_date_id: 7,
            frequency: "Monthly",
            cadence: "All Months",
          },
        ],
      },
      {
        year: 2025,
        month: "august",
        income: [
          {
            label: "husband",
            value: 40000,
            budget_id: 15,
            budget_date_id: 8,
          },
        ],
        expense: [
          {
            label: "Netflix",
            value: 19.99,
            paid: false,
            budget_id: 16,
            budget_date_id: 8,
          },
          {
            label: "Hulu",
            value: 12,
            paid: false,
            budget_id: 32,
            budget_date_id: 8,
            frequency: "Monthly",
            cadence: "All Months",
          },
        ],
      },
      {
        year: 2025,
        month: "september",
        income: [
          {
            label: "husband",
            value: 40000,
            budget_id: 17,
            budget_date_id: 9,
          },
        ],
        expense: [
          {
            label: "Netflix",
            value: 19.99,
            paid: false,
            budget_id: 18,
            budget_date_id: 9,
          },
          {
            label: "Hulu",
            value: 12,
            paid: false,
            budget_id: 33,
            budget_date_id: 9,
            frequency: "Monthly",
            cadence: "All Months",
          },
        ],
      },
      {
        year: 2025,
        month: "october",
        income: [
          {
            label: "husband",
            value: 40000,
            budget_id: 19,
            budget_date_id: 10,
          },
        ],
        expense: [
          {
            label: "Netflix",
            value: 19.99,
            paid: false,
            budget_id: 20,
            budget_date_id: 10,
          },
          {
            label: "Hulu",
            value: 12,
            paid: false,
            budget_id: 34,
            budget_date_id: 10,
            frequency: "Monthly",
            cadence: "All Months",
          },
        ],
      },
      {
        year: 2025,
        month: "november",
        income: [
          {
            label: "husband",
            value: 40000,
            budget_id: 21,
            budget_date_id: 11,
          },
        ],
        expense: [
          {
            label: "Netflix",
            value: 19.99,
            paid: false,
            budget_id: 22,
            budget_date_id: 11,
          },
          {
            label: "Hulu",
            value: 12,
            paid: false,
            budget_id: 35,
            budget_date_id: 11,
            frequency: "Monthly",
            cadence: "All Months",
          },
        ],
      },
      {
        year: 2025,
        month: "december",
        income: [
          {
            label: "husband",
            value: 40000,
            budget_id: 23,
            budget_date_id: 12,
          },
        ],
        expense: [
          {
            label: "Netflix",
            value: 19.99,
            paid: false,
            budget_id: 24,
            budget_date_id: 12,
          },
          {
            label: "Hulu",
            value: 12,
            paid: false,
            budget_id: 36,
            budget_date_id: 12,
            frequency: "Monthly",
            cadence: "All Months",
          },
        ],
      },
    ];

    for (let i = 0; i <= 11; i++) {
      expect(JSON.stringify(budgetFullInserted[i].expense[1])).toBe(
        JSON.stringify(insertedBudget[i].expense[1]),
      );
    }
  });

  test("should update quarter months", () => {
    insertBudgetIds(
      budgetFullInserted[2],
      budgetFullInserted[2].income[1],
      budgetFullInserted,
      "march",
      2025,
      "income",
      { budget_id: [25, 26, 27, 28] },
    );

    const insertedBudget = [
      {
        year: 2025,
        month: "january",
        income: [
          {
            label: "husband",
            value: 40000,
            budget_id: 1,
            budget_date_id: 1,
          },
          {
            label: "wife",
            value: 75000,
            budget_id: null,
            budget_date_id: 1,
            frequency: "Monthly",
          },
        ],
        expense: [
          {
            label: "Netflix",
            value: 19.99,
            paid: false,
            budget_id: 2,
            budget_date_id: 1,
          },
        ],
      },
      {
        year: 2025,
        month: "february",
        income: [
          {
            label: "husband",
            value: 40000,
            budget_id: 3,
            budget_date_id: 2,
          },
          {
            label: "wife",
            value: 55000,
            budget_id: null,
            budget_date_id: 2,
            frequency: "Monthly",
            cadence: "Future Months",
          },
        ],
        expense: [
          {
            label: "Netflix",
            value: 19.99,
            paid: false,
            budget_id: 4,
            budget_date_id: 2,
          },
        ],
      },
      {
        year: 2025,
        month: "march",
        income: [
          {
            label: "husband",
            value: 40000,
            budget_id: 5,
            budget_date_id: 3,
          },
          {
            label: "wife",
            value: 35000,
            budget_id: 25,
            budget_date_id: 3,
            frequency: "Quarterly",
            cadence: "All Months",
          },
        ],
        expense: [
          {
            label: "Netflix",
            value: 19.99,
            paid: false,
            budget_id: 6,
            budget_date_id: 3,
          },
        ],
      },
      {
        year: 2025,
        month: "april",
        income: [
          {
            label: "husband",
            value: 40000,
            budget_id: 7,
            budget_date_id: 4,
          },
          {
            label: "wife",
            value: 55000,
            budget_id: null,
            budget_date_id: 4,
            frequency: "Monthly",
            cadence: "Future Months",
          },
        ],
        expense: [
          {
            label: "Netflix",
            value: 19.99,
            paid: false,
            budget_id: 8,
            budget_date_id: 4,
          },
        ],
      },
      {
        year: 2025,
        month: "may",
        income: [
          {
            label: "husband",
            value: 40000,
            budget_id: 9,
            budget_date_id: 5,
          },
          {
            label: "wife",
            value: 55000,
            budget_id: null,
            budget_date_id: 5,
            frequency: "Monthly",
            cadence: "Future Months",
          },
        ],
        expense: [
          {
            label: "Netflix",
            value: 19.99,
            paid: false,
            budget_id: 10,
            budget_date_id: 5,
          },
        ],
      },
      {
        year: 2025,
        month: "june",
        income: [
          {
            label: "husband",
            value: 40000,
            budget_id: 11,
            budget_date_id: 6,
          },
          {
            label: "wife",
            value: 35000,
            budget_id: 26,
            budget_date_id: 6,
            frequency: "Quarterly",
            cadence: "All Months",
          },
        ],
        expense: [
          {
            label: "Netflix",
            value: 19.99,
            paid: false,
            budget_id: 12,
            budget_date_id: 6,
          },
        ],
      },
      {
        year: 2025,
        month: "july",
        income: [
          {
            label: "husband",
            value: 40000,
            budget_id: 13,
            budget_date_id: 7,
          },
          {
            label: "wife",
            value: 55000,
            budget_id: null,
            budget_date_id: 7,
            frequency: "Monthly",
            cadence: "Future Months",
          },
        ],
        expense: [
          {
            label: "Netflix",
            value: 19.99,
            paid: false,
            budget_id: 14,
            budget_date_id: 7,
          },
        ],
      },
      {
        year: 2025,
        month: "august",
        income: [
          {
            label: "husband",
            value: 40000,
            budget_id: 15,
            budget_date_id: 8,
          },
          {
            label: "wife",
            value: 55000,
            budget_id: null,
            budget_date_id: 8,
            frequency: "Monthly",
            cadence: "Future Months",
          },
        ],
        expense: [
          {
            label: "Netflix",
            value: 19.99,
            paid: false,
            budget_id: 16,
            budget_date_id: 8,
          },
        ],
      },
      {
        year: 2025,
        month: "september",
        income: [
          {
            label: "husband",
            value: 40000,
            budget_id: 17,
            budget_date_id: 9,
          },
          {
            label: "wife",
            value: 35000,
            budget_id: 27,
            budget_date_id: 9,
            frequency: "Quarterly",
            cadence: "All Months",
          },
        ],
        expense: [
          {
            label: "Netflix",
            value: 19.99,
            paid: false,
            budget_id: 18,
            budget_date_id: 9,
          },
        ],
      },
      {
        year: 2025,
        month: "october",
        income: [
          {
            label: "husband",
            value: 40000,
            budget_id: 19,
            budget_date_id: 10,
          },
          {
            label: "wife",
            value: 55000,
            budget_id: null,
            budget_date_id: 10,
            frequency: "Monthly",
            cadence: "Future Months",
          },
        ],
        expense: [
          {
            label: "Netflix",
            value: 19.99,
            paid: false,
            budget_id: 20,
            budget_date_id: 10,
          },
        ],
      },
      {
        year: 2025,
        month: "november",
        income: [
          {
            label: "husband",
            value: 40000,
            budget_id: 21,
            budget_date_id: 11,
          },
          {
            label: "wife",
            value: 55000,
            budget_id: null,
            budget_date_id: 11,
            frequency: "Monthly",
            cadence: "Future Months",
          },
        ],
        expense: [
          {
            label: "Netflix",
            value: 19.99,
            paid: false,
            budget_id: 22,
            budget_date_id: 11,
          },
        ],
      },
      {
        year: 2025,
        month: "december",
        income: [
          {
            label: "husband",
            value: 40000,
            budget_id: 23,
            budget_date_id: 12,
          },
          {
            label: "wife",
            value: 35000,
            budget_id: 28,
            budget_date_id: 12,
            frequency: "Quarterly",
            cadence: "All Months",
          },
        ],
        expense: [
          {
            label: "Netflix",
            value: 19.99,
            paid: false,
            budget_id: 24,
            budget_date_id: 12,
          },
        ],
      },
    ];

    for (let i = 0; i <= 11; i++) {
      expect(JSON.stringify(budgetFullInserted[i].income[1])).toBe(
        JSON.stringify(insertedBudget[i].income[1]),
      );
    }
  });
});
