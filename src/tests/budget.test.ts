import { expect, test } from "@jest/globals";
import {
  getMonthlyTotalAmount,
  getMonthlyBudgetBreakdown,
} from "../functions/budget";
import { mockBudget, mockBudgetItem } from "./mocks";

describe("getMonthlyTotalAmount", () => {
  test("should return 0", () => {
    const amount = getMonthlyTotalAmount(null, "january", 2025, "income");

    expect(amount).toBe(0);
  });

  test("should return total monthly amount", () => {
    const amount = getMonthlyTotalAmount(mockBudget, "january", 2025, "income");

    expect(amount).toBe(36);
  });
});

describe("getMonthlyBudgetBreakdown", () => {
  test("should return full results of budget", () => {
    const results = getMonthlyBudgetBreakdown(mockBudgetItem);
    const expectedResults = JSON.stringify({
      data: [19, 17],
      labels: ["Netflix", "Hulu"],
    });

    expect(JSON.stringify(results)).toBe(expectedResults);
  });
});
