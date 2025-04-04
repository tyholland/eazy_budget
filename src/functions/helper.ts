import { listOfMonths, subscriptionPlan } from "../constants.ts";
import { BudgetDataItem } from "../types.ts";

export const formatAmount = (amount: number) => {
  const numObj = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const formattedNum = numObj.format(amount);

  return `$${formattedNum}`;
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

export const getCurrentPageName = (pathName: string) => {
  const page = pathName.split("/");
  const path = page.length === 2 ? `/${page[1]}` : `/${page[1]}/${page[2]}`;
  const { currentYear } = getDateInfo();
  let pageName = "";
  let page2Name = "";

  switch (path) {
    case "/monthly/income":
      pageName = "Monthly Income";
      page2Name = "Yearly Income";
      break;
    case "/monthly/expense":
      pageName = "Monthly Expense";
      page2Name = "Yearly Expense";
      break;
    case "/yearly/income":
      pageName = "Yearly Income";
      break;
    case "/yearly/expense":
      pageName = "Yearly Expense";
      break;
    case "/add/expense":
      pageName = "Add Expense";
      break;
    case "/add/income":
      pageName = "Add Income";
      break;
    case "/account/predict":
      pageName = "Budget Prediction";
      page2Name = "Account";
      break;
    case "/account/history":
      pageName = "Budget History";
      page2Name = "Account";
      break;
    case "/account/past-months":
      pageName = `${currentYear} Past Months`;
      page2Name = "Account";
      break;
    case "/account":
      pageName = "Account";
      break;
    default:
      pageName = "";
      break;
  }

  return {
    pageName,
    page2Name,
  };
};

export const removeItemFromNumberArray = (
  budgetArr: number[],
  index: number,
) => {
  const newArr = [...budgetArr];
  newArr.splice(index, 1);

  return newArr;
};

export const removeItemFromBudgetArray = (
  budgetArr: BudgetDataItem[],
  index: number,
) => {
  const newArr = [...budgetArr];
  newArr.splice(index, 1);

  return newArr;
};

export const getSubscriptionStatus = (
  expectedPlan: string,
  subscription_id?: number,
) => {
  if (!subscription_id) {
    return false;
  }

  const ogPlan = subscription_id === 1;
  const starterPlan = subscription_id === 3;
  const proPlan = subscription_id === 4;

  if ("Starter" === expectedPlan) {
    return starterPlan || proPlan || ogPlan;
  }

  if ("Pro" === expectedPlan) {
    return proPlan || ogPlan;
  }

  return ogPlan;
};

export const getSubscriptionName = (subscription_id?: number) => {
  if (!subscription_id) {
    return "Free";
  }

  return subscriptionPlan[subscription_id - 1];
};
