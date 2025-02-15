import { expect, test } from "@jest/globals";
import { formatAmount } from "../functions/helper";

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
