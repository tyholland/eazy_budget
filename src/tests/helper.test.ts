import { expect, test } from "@jest/globals";
import {
  formatAmount,
  getCurrentPageName,
  getDateInfo,
  removeItemFromArray,
} from "../functions/helper";
import { listOfMonths } from "../constants";

describe("formatAmount", () => {
  test("should return whole number with US currency", () => {
    const amount = formatAmount(40);

    expect(amount).toBe("$40.00");
  });

  test("should return decimal number with US currency", () => {
    const amount = formatAmount(10.55);

    expect(amount).toBe("$10.55");
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

describe("removeItemFromArray", () => {
  test("should return array with removed index", () => {
    const arr: number[] = [1, 2, 3];
    const page = removeItemFromArray(arr, 1);
    const response = JSON.stringify([1, 3]);

    expect(JSON.stringify(page)).toBe(response);
  });

  test("should return an empty array", () => {
    const arr: number[] = [1];
    const page = removeItemFromArray(arr, 0);
    const response = JSON.stringify([]);

    expect(JSON.stringify(page)).toBe(response);
  });
});
