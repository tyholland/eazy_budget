import { listOfMonths } from "../constants.ts";

export const formatAmount = (amount: number) => {
  return `$${amount.toFixed(2)}`;
};

export const getDateInfo = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = listOfMonths[date.getMonth()];

  return {
    currentYear: year,
    currentMonth: month,
  };
};

export const getCurrentPageName = (path: string) => {
  let pageName = "";

  switch (path) {
    case "/monthly/income":
      pageName = "Monthly Income";
      break;
    case "/monthly/expense":
      pageName = "Monthly Expense";
      break;
    case "/yearly/income":
      pageName = "Yearly Income";
      break;
    case "/yearly/expense":
      pageName = "Yearly Expense";
      break;
    case "/create/expense":
      pageName = "Create Expense";
      break;
    case "/create/income":
      pageName = "Create Income";
      break;
    default:
      pageName = "";
      break;
  }

  return pageName;
};
