import { expect, test } from "@jest/globals";
import { getTotalAmount, getBudgetBreakdown } from "../functions/budget";

describe("getTotalAmount", () => {
  test("should return 0", () => {
    const amount = getTotalAmount(undefined);

    expect(amount).toBe(0);
  });

  test("should return decimal number with US currency", () => {
    const amounts = [
      {
        label: "Netflix",
        value: 19,
      },
      {
        label: "Hulu",
        value: 17,
      },
    ];
    const amount = getTotalAmount(amounts);

    expect(amount).toBe(36);
  });
});

describe("getBudgetBreakdown", () => {
  test("should return month and year of the current date", () => {
    const budget = [
      {
        label: "Netflix",
        value: 19,
      },
      {
        label: "Hulu",
        value: 17,
      },
    ];
    const results = getBudgetBreakdown(budget);
    const expectedResults = JSON.stringify({
      data: [19, 17],
      labels: ["Netflix", "Hulu"],
    });

    expect(JSON.stringify(results)).toBe(expectedResults);
  });
});
