import { expect, test } from "@jest/globals";
import {
  getMonthlyTotalAmount,
  getMonthlyBudgetBreakdown,
  getYearlyTotalAmount,
  getYearlyBudgetBreakdown,
  createInitialBudget,
  addAdditionalBudget,
  formatBudgetTypes,
} from "../functions/budget";
import { mockBudget, mockBudgetEntries } from "./mocks";

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
  test("should return emoty arrays", () => {
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
  test("should return emoty arrays", () => {
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
  test("should return emoty arrays", () => {
    const results = createInitialBudget([], 2025, "expense");
    const expectedResults = JSON.stringify({
      data: [],
      labels: [],
      newBudget: [],
    });

    expect(JSON.stringify(results)).toBe(expectedResults);
  });

  test("should return full results of yearly budget", () => {
    const results = createInitialBudget(mockBudget, 2025, "expense");
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

describe("addAdditionalBudget", () => {
  test("should work with emoty array", () => {
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

describe("formatBudgetTypes", () => {
  test("should return an emoty array", () => {
    const results = formatBudgetTypes({});
    const expectedResults = JSON.stringify([]);

    expect(JSON.stringify(results)).toBe(expectedResults);
  });
  test("should return budget entries", () => {
    const results = formatBudgetTypes(mockBudgetEntries);
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
