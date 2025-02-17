import { listOfMonths } from "../constants.ts";

export const formatAmount = (amount: number) => {
  return `$${amount.toFixed(2)}`;
};

export const getDateInfo = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = listOfMonths[date.getMonth()];

  return {
    year,
    month,
  };
};
