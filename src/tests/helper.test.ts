import { describe, expect, test } from "@jest/globals";
import {
  formatAmount,
  getCurrentPageName,
  getDateInfo,
  removeItemFromNumberArray,
  removeItemFromBudgetArray,
  getSubscriptionStatus,
  getSubscriptionName,
  getErrorMessage,
} from "../functions/helper";
import { listOfMonths } from "../constants";
import { mockBudgetItemArray } from "./mocks";

describe("formatAmount", () => {
  test("should return whole number", () => {
    const amount = formatAmount(40);

    expect(amount).toBe("$40.00");
  });

  test("should return decimal number", () => {
    const amount = formatAmount(10.55);

    expect(amount).toBe("$10.55");
  });

  test("should return commas in number", () => {
    const amount = formatAmount(1946720.55);

    expect(amount).toBe("$1,946,720.55");
  });

  test("should return commas and '.00' in number", () => {
    const amount = formatAmount(9238465);

    expect(amount).toBe("$9,238,465.00");
  });
});

describe("getDateInfo", () => {
  test("should return month and year of the current date", () => {
    const date = getDateInfo();
    const currentDate = new Date();

    const responseDate = JSON.stringify({
      currentYear: currentDate.getFullYear(),
      currentMonth: listOfMonths[currentDate.getMonth()],
    });

    expect(JSON.stringify(date)).toBe(responseDate);
  });
});

describe("getCurrentPageName", () => {
  test("should return empty string", () => {
    const page = getCurrentPageName("/");
    const result = JSON.stringify({
      pageName: "",
      page2Name: "",
    });

    expect(JSON.stringify(page)).toBe(result);
  });

  test("should return single pathname", () => {
    const page = getCurrentPageName("/account");
    const result = JSON.stringify({
      pageName: "Account",
      page2Name: "",
    });

    expect(JSON.stringify(page)).toBe(result);
  });

  test("should return multiple pathname", () => {
    const page = getCurrentPageName("/monthly/income");
    const result = JSON.stringify({
      pageName: "Monthly Income",
      page2Name: "Yearly Income",
    });

    expect(JSON.stringify(page)).toBe(result);
  });
});

describe("removeItemFromNumberArray", () => {
  test("should return array with removed index", () => {
    const arr: number[] = [1, 2, 3];
    const page = removeItemFromNumberArray(arr, 1);
    const response = JSON.stringify([1, 3]);

    expect(JSON.stringify(page)).toBe(response);
  });

  test("should return an empty array", () => {
    const arr: number[] = [1];
    const page = removeItemFromNumberArray(arr, 0);
    const response = JSON.stringify([]);

    expect(JSON.stringify(page)).toBe(response);
  });
});

describe("removeItemFromBudgetArray", () => {
  test("should return array with removed index", () => {
    const page = removeItemFromBudgetArray(mockBudgetItemArray, 1);
    const response = JSON.stringify([
      { ...mockBudgetItemArray[0] },
      { ...mockBudgetItemArray[2] },
    ]);

    expect(JSON.stringify(page)).toBe(response);
  });

  test("should return an empty array", () => {
    const page = removeItemFromBudgetArray([{ ...mockBudgetItemArray[0] }], 0);
    const response = JSON.stringify([]);

    expect(JSON.stringify(page)).toBe(response);
  });
});

describe("getSubscriptionStatus", () => {
  test("should return true for Pro plan", () => {
    const plan = getSubscriptionStatus("Pro", 4);
    const response = true;

    expect(plan).toBe(response);
  });

  test("should return true for Starter plan even if grandfather in", () => {
    const plan = getSubscriptionStatus("Starter", 1);
    const response = true;

    expect(plan).toBe(response);
  });

  test("should return true for Starter plan even if Pro plan", () => {
    const plan = getSubscriptionStatus("Starter", 4);
    const response = true;

    expect(plan).toBe(response);
  });

  test("should return false for Pro plan", () => {
    const plan = getSubscriptionStatus("Pro", 2);
    const response = false;

    expect(plan).toBe(response);
  });

  test("should return false for undefined subscription_id", () => {
    const plan = getSubscriptionStatus("Pro", undefined);
    const response = false;

    expect(plan).toBe(response);
  });
});

describe("getSubscriptionName", () => {
  test("should return Starter plan", () => {
    const plan = getSubscriptionName(3);
    const response = "Starter";

    expect(plan).toBe(response);
  });

  test("should return Free plan for undefined subscription_id", () => {
    const plan = getSubscriptionName(undefined);
    const response = "Free";

    expect(plan).toBe(response);
  });

  test("should return Grandfathered for OG account", () => {
    const plan = getSubscriptionName(1);
    const response = "Grandfathered";

    expect(plan).toBe(response);
  });
});

describe("getErrorMessage", () => {
  test("should return label error", () => {
    const error = getErrorMessage("", 20);
    const response = JSON.stringify(["Please enter a label"]);

    expect(JSON.stringify(error)).toBe(response);
  });

  test("should return amount error", () => {
    const error = getErrorMessage("Netflix", "");
    const response = JSON.stringify(["Please enter an amount"]);

    expect(JSON.stringify(error)).toBe(response);
  });

  test("should return all errors", () => {
    const error = getErrorMessage("", "");
    const response = JSON.stringify([
      "Please enter a label",
      "Please enter an amount",
    ]);

    expect(JSON.stringify(error)).toBe(response);
  });

  test("should return no errors", () => {
    const error = getErrorMessage("Netflix", 20);
    const response = JSON.stringify([]);

    expect(JSON.stringify(error)).toBe(response);
  });
});
