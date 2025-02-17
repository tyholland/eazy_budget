import { expect, test } from "@jest/globals";
import { formatAmount, getDateInfo } from "../functions/helper";
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
      year: currentDate.getFullYear(),
      month: listOfMonths[currentDate.getMonth()],
    });

    expect(JSON.stringify(date)).toBe(responseDate);
  });
});
