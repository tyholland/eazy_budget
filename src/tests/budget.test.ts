import { expect, test } from "@jest/globals";
import {
  getMonthlyTotalAmount,
  getMonthlyBudgetBreakdown,
  getYearlyTotalAmount,
  getYearlyBudgetBreakdown,
  createInitialBudget,
  addAdditionalBudget,
  formatBudgetItem,
  reformatBudgetItem,
} from "../functions/budget";
import {
  mockBudget,
  mockBudgetEntries,
  mockBudgetEntriesNoDollar,
} from "./mocks";
import { getDateInfo } from "../functions/helper";

describe("getMonthlyTotalAmount", () => {
  test("should return 0", () => {
    const amount = getMonthlyTotalAmount([], "january", 2025, "income");

    expect(amount).toBe(0);
  });

  test("should return total monthly amount", () => {
    const amount = getMonthlyTotalAmount(
      mockBudget,
      "january",
      2025,
      "expense",
    );

    expect(amount).toBe(36);
  });
});

describe("getYearlyTotalAmount", () => {
  test("should return 0", () => {
    const amount = getYearlyTotalAmount([], 2025, "income");

    expect(amount).toBe(0);
  });

  test("should return total yearly amount", () => {
    const amount = getYearlyTotalAmount(mockBudget, 2025, "income");

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
      mockBudget,
      "january",
      "expense",
      2025,
    );
    const expectedResults = JSON.stringify({
      data: [19, 17],
      labels: ["Netflix", "Hulu"],
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
    const results = getYearlyBudgetBreakdown(mockBudget, 2025, "expense");
    const expectedResults = JSON.stringify({
      data: [36],
      labels: ["january"],
      newBudget: [
        {
          label: "january",
          value: 36,
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
    const income = mockBudget[0].income;
    const expense = mockBudget[0].expense;
    const results = createInitialBudget(income, expense);
    const { currentYear } = getDateInfo();
    const expectedResults = JSON.stringify([
      {
        year: currentYear,
        month: "january",
        income,
        expense,
      },
      {
        year: currentYear,
        month: "february",
        income,
        expense,
      },
      {
        year: currentYear,
        month: "march",
        income,
        expense,
      },
      {
        year: currentYear,
        month: "april",
        income,
        expense,
      },
      {
        year: currentYear,
        month: "may",
        income,
        expense,
      },
      {
        year: currentYear,
        month: "june",
        income,
        expense,
      },
      {
        year: currentYear,
        month: "july",
        income,
        expense,
      },
      {
        year: currentYear,
        month: "august",
        income,
        expense,
      },
      {
        year: currentYear,
        month: "september",
        income,
        expense,
      },
      {
        year: currentYear,
        month: "october",
        income,
        expense,
      },
      {
        year: currentYear,
        month: "november",
        income,
        expense,
      },
      {
        year: currentYear,
        month: "december",
        income,
        expense,
      },
    ]);

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
    const results = formatBudgetItem({});
    const expectedResults = JSON.stringify([]);

    expect(JSON.stringify(results)).toBe(expectedResults);
  });
  test("should return budget entries", () => {
    const results = formatBudgetItem(mockBudgetEntries);
    const expectedResults = JSON.stringify([
      {
        label: "netflix",
        value: 19.99,
        paid: false,
      },
      {
        label: "hulu",
        value: 20.99,
        paid: false,
      },
      {
        label: "internet",
        value: 70.7,
        paid: false,
      },
    ]);

    expect(JSON.stringify(results)).toBe(expectedResults);
  });
});

describe("reformatBudgetItem", () => {
  test("should return an empty array", () => {
    const results = reformatBudgetItem({});
    const expectedResults = JSON.stringify([]);

    expect(JSON.stringify(results)).toBe(expectedResults);
  });
  test("should return budget items", () => {
    const results = reformatBudgetItem(mockBudgetEntriesNoDollar);
    const expectedResults = JSON.stringify([
      {
        label: "netflix",
        value: 19.99,
        paid: false,
      },
      {
        label: "hulu",
        value: 20.99,
        paid: false,
      },
      {
        label: "internet",
        value: 70.7,
        paid: false,
      },
    ]);

    expect(JSON.stringify(results)).toBe(expectedResults);
  });
});
