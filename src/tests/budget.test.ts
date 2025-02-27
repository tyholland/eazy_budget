import { expect, test } from "@jest/globals";
import { getMonthlyTotalAmount, getBudgetBreakdown } from "../functions/budget";
import { mockBudget, mockBudgetItem } from "./mocks";

describe("getMonthlyTotalAmount", () => {
  test("should return 0", () => {
    const amount = getMonthlyTotalAmount(null, "january", 2025, "income");

    expect(amount).toBe(0);
  });

  test("should return total amount", () => {
    const amount = getMonthlyTotalAmount(mockBudget, "january", 2025, "income");

    expect(amount).toBe(36);
  });
});

describe("getBudgetBreakdown", () => {
  test("should return month and year of the current date", () => {
    const results = getBudgetBreakdown(mockBudgetItem);
    const expectedResults = JSON.stringify({
      data: [19, 17],
      labels: ["Netflix", "Hulu"],
    });

    expect(JSON.stringify(results)).toBe(expectedResults);
  });
});
