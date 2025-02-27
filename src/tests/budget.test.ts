import { expect, test } from "@jest/globals";
import {
  getMonthlyTotalAmount,
  getMonthlyBudgetBreakdown,
  getYearlyTotalAmount,
  getYearlyBudgetBreakdown,
} from "../functions/budget";
import { mockBudget } from "./mocks";

describe("getMonthlyTotalAmount", () => {
  test("should return 0", () => {
    const amount = getMonthlyTotalAmount(null, "january", 2025, "income");

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
    const amount = getYearlyTotalAmount(null, 2025, "income");

    expect(amount).toBe(0);
  });

  test("should return total yearly amount", () => {
    const amount = getYearlyTotalAmount(mockBudget, 2025, "income");

    expect(amount).toBe(70000);
  });
});

describe("getMonthlyBudgetBreakdown", () => {
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
