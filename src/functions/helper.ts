import moment from "moment-business-days";
import {
  frequencyShortHandMap,
  listOfMonths,
  subscriptionPlan,
} from "../constants.ts";
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
    case "/account/share":
      pageName = "Share Account";
      page2Name = "Account";
      break;
    case "/account/subscription":
      pageName = "Subscription Details";
      page2Name = "Account";
      break;
    case "/account/categories":
      pageName = "Categories";
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

export const getErrorMessage = (label: string, amount: string | number) => {
  const msg: string[] = [];

  if (!label) {
    msg.push("Please enter a label");
  }

  if (!amount || amount === "0") {
    msg.push("Please enter an amount");
  }

  return msg;
};

export const getFrequencyValue = (
  value: number,
  month: string,
  year: number,
  frequency?: string,
) => {
  if (!frequency) {
    return value;
  }

  const businessDays = moment(
    `${year}-${listOfMonths.indexOf(month) + 1}-01`,
    "YYYY-MM-DD",
  ).monthBusinessDays().length;

  switch (frequency) {
    case "Daily":
      return Number((value * businessDays).toFixed(2));
    case "Weekly":
      return Number((value * 4).toFixed(2));
    case "Semi-Monthly":
      return Number((value * 2).toFixed(2));
    case "Monthly":
      return value;
    default:
      return value;
  }
};

export const getFrequencyContent = (
  month?: string,
  year?: string,
  amount?: number,
  frequency?: string,
) => {
  if (!frequency || !month || !year) {
    return "every month";
  }

  const freq = frequencyShortHandMap[frequency];
  const val = revertAmountToOriginal(amount || 0, month, year, frequency);

  return freq === "month"
    ? `every ${freq}`
    : `${formatAmount(val)} every ${freq}`;
};

export const revertAmountToOriginal = (
  value: number,
  month?: string,
  year?: string,
  frequency?: string,
) => {
  if (!frequency || !month || !year) {
    return value;
  }

  const businessDays = moment(
    `${year}-${listOfMonths.indexOf(month) + 1}-01`,
    "YYYY-MM-DD",
  ).monthBusinessDays().length;

  switch (frequency) {
    case "Daily":
      return value / businessDays;
    case "Weekly":
      return value / 4;
    case "Semi-Monthly":
      return value / 2;
    case "Monthly":
      return value;
    default:
      return value;
  }
};
