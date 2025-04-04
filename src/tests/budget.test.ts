import { describe, expect, test } from "@jest/globals";
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
} from "../functions/budget";
import {
  mockBudget,
  mockBudgetBody,
  mockBudgetEntries,
  mockBudgetEntriesNoDollar,
  mockBudgetFull,
  mockBudgetInsertIds,
  mockBudgetItemArray,
  mockBudgetTwo,
} from "./mocks";

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
          budget_id: null,
          budget_date_id: null,
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
    const results = createInitialBudget(mockBudgetBody, mockBudgetInsertIds);
    const expectedResults = JSON.stringify(mockBudgetFull);

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
    const expectedResults = JSON.stringify(mockBudgetItemArray);

    expect(JSON.stringify(results)).toBe(expectedResults);
  });
});

describe("reformatBudgetItem", () => {
  test("should return an empty array", () => {
    const results = reformatBudgetItem({}, null, null, true);
    const expectedResults = JSON.stringify([]);

    expect(JSON.stringify(results)).toBe(expectedResults);
  });

  test("should return budget items", () => {
    const results = reformatBudgetItem(
      mockBudgetEntriesNoDollar,
      null,
      null,
      false,
    );
    const expectedResults = JSON.stringify(mockBudgetItemArray);

    expect(JSON.stringify(results)).toBe(expectedResults);
  });
});

describe("addNewBudgetItem", () => {
  test("should add a new budget item", () => {
    const results = addNewBudgetItem(mockBudget, "january", 2025, "income");
    const newBudget = [...mockBudget];
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
    const results = formatBudgetData([], mockBudget[0].expense);
    const expectedResults = JSON.stringify([]);

    expect(JSON.stringify(results)).toBe(expectedResults);
  });

  test("should return empty array for empty expense", () => {
    const results = formatBudgetData(mockBudget[0].income, []);
    const expectedResults = JSON.stringify([]);

    expect(JSON.stringify(results)).toBe(expectedResults);
  });

  test("should return formatted budget", () => {
    const results = formatBudgetData(
      mockBudgetTwo[0].income,
      mockBudgetTwo[0].expense,
    );
    const expectedResults = JSON.stringify(mockBudgetBody);

    expect(JSON.stringify(results)).toBe(expectedResults);
  });
});

describe("sortBudget", () => {
  test("should return alpha asc budget items as default sort", () => {
    const results = mockBudgetItemArray.sort(sortBudget);
    const expectedResults = JSON.stringify([
      {
        label: "hulu",
        value: 20.99,
        paid: false,
        budget_id: null,
        budget_date_id: null,
      },
      {
        label: "internet",
        value: 70.7,
        paid: false,
        budget_id: null,
        budget_date_id: null,
      },
      {
        label: "netflix",
        value: 19.99,
        paid: false,
        budget_id: null,
        budget_date_id: null,
      },
    ]);

    expect(JSON.stringify(results)).toBe(expectedResults);
  });

  test("should return alpha desc budget items", () => {
    const results = mockBudgetItemArray.sort((a, b) =>
      sortBudget(a, b, "Z - A"),
    );
    const expectedResults = JSON.stringify([
      {
        label: "netflix",
        value: 19.99,
        paid: false,
        budget_id: null,
        budget_date_id: null,
      },
      {
        label: "internet",
        value: 70.7,
        paid: false,
        budget_id: null,
        budget_date_id: null,
      },
      {
        label: "hulu",
        value: 20.99,
        paid: false,
        budget_id: null,
        budget_date_id: null,
      },
    ]);

    expect(JSON.stringify(results)).toBe(expectedResults);
  });

  test("should return numeric asc budget items", () => {
    const results = mockBudgetItemArray.sort((a, b) =>
      sortBudget(a, b, "High - Low"),
    );
    const expectedResults = JSON.stringify([
      {
        label: "internet",
        value: 70.7,
        paid: false,
        budget_id: null,
        budget_date_id: null,
      },
      {
        label: "hulu",
        value: 20.99,
        paid: false,
        budget_id: null,
        budget_date_id: null,
      },
      {
        label: "netflix",
        value: 19.99,
        paid: false,
        budget_id: null,
        budget_date_id: null,
      },
    ]);

    expect(JSON.stringify(results)).toBe(expectedResults);
  });

  test("should return numeric desc budget items", () => {
    const results = mockBudgetItemArray.sort((a, b) =>
      sortBudget(a, b, "Low - High"),
    );
    const expectedResults = JSON.stringify([
      {
        label: "netflix",
        value: 19.99,
        paid: false,
        budget_id: null,
        budget_date_id: null,
      },
      {
        label: "hulu",
        value: 20.99,
        paid: false,
        budget_id: null,
        budget_date_id: null,
      },
      {
        label: "internet",
        value: 70.7,
        paid: false,
        budget_id: null,
        budget_date_id: null,
      },
    ]);

    expect(JSON.stringify(results)).toBe(expectedResults);
  });
});
