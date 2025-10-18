import moment from "moment-business-days";
import {
  frequencyShortHandMap,
  listOfMonths,
  subscriptionPlan,
} from "../constants.ts";
import { BudgetDataItem, User } from "../types.ts";
import { convertCurrency } from "../requests/budget.ts";

export const formatAmount = (amount: number, currency: string) => {
  switch (currency) {
    case "USD":
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);
    case "EUR":
      return new Intl.NumberFormat("en-DE", {
        style: "currency",
        currency: "EUR",
      }).format(amount);
    case "JPY":
      return new Intl.NumberFormat("ja-JP", {
        style: "currency",
        currency: "JPY",
      }).format(amount);
    case "GBP":
      return new Intl.NumberFormat("en-GB", {
        style: "currency",
        currency: "GBP",
      }).format(amount);
    case "CHF":
      return new Intl.NumberFormat("de-CH", {
        style: "currency",
        currency: "CHF",
      }).format(amount);
    case "AUD":
      return new Intl.NumberFormat("en-AU", {
        style: "currency",
        currency: "AUD",
      }).format(amount);
    case "CAD":
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "CAD",
      }).format(amount);
    default:
      return new Intl.NumberFormat("en-CA", {
        style: "currency",
        currency: "USD",
      }).format(amount);
  }
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

const capitalizePageTitle = (title: string) => {
  let pageTitle = title.replace("/", "");
  const firstLetter = pageTitle.charAt(0).toUpperCase();
  pageTitle = pageTitle.slice(1);

  return firstLetter.concat(pageTitle);
};

export const getCurrentPageName = (pathName: string) => {
  if (pathName === "/") {
    return {
      pageName: "Home",
      page2Name: "",
    };
  }

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
      pageName = capitalizePageTitle(path);
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
  const freePlan = subscription_id === 2;
  const starterPlan = subscription_id === 3;
  const proPlan = subscription_id === 4;
  const testerPlan = subscription_id === 5;

  // Referral plans
  const starterYearPlan = subscription_id === 6;
  const proYearPlan = subscription_id === 7;

  if ("Starter" === expectedPlan) {
    return (
      starterPlan ||
      proPlan ||
      ogPlan ||
      starterYearPlan ||
      proYearPlan ||
      testerPlan
    );
  }

  if ("Pro" === expectedPlan) {
    return proPlan || ogPlan || testerPlan || proYearPlan;
  }

  if ("Free" === expectedPlan) {
    return freePlan || ogPlan;
  }

  if ("Tester" === expectedPlan) {
    return testerPlan || ogPlan;
  }

  if ("Referral" === expectedPlan) {
    return starterYearPlan || proYearPlan;
  }

  if ("OG" === expectedPlan) {
    return ogPlan;
  }

  return freePlan;
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

export const getFrequencyContent = async (
  month?: string,
  year?: string,
  amount?: number,
  frequency?: string,
  currentUser?: User,
) => {
  if (!frequency || !month || !year) {
    return "every month";
  }

  const freq = frequencyShortHandMap[frequency];
  const val = revertAmountToOriginal(amount || 0, month, year, frequency);
  const { currencyValue } = await getFormattedCurrency(val, currentUser);

  return freq === "month" ? `every ${freq}` : `${currencyValue} every ${freq}`;
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

export const getBudgetRule = (
  discretionary: string,
  savings: string,
  fun: string,
) => {
  const discretionaryPercent = Math.round(
    Number(discretionary.replace("%", "")),
  );
  const savingsPercent = Math.round(Number(savings.replace("%", "")));
  const funPercent = Math.round(Number(fun.replace("%", "")));

  return `${discretionaryPercent}/${savingsPercent}/${funPercent}`;
};

export const getFormattedCurrency = async (
  amount: number,
  currentUser?: User,
) => {
  if (
    !currentUser ||
    (currentUser && currentUser.currency === "USD") ||
    !currentUser.currency
  ) {
    const convertedValue = formatAmount(amount, "USD");

    return {
      currencyValue: convertedValue,
      emptyValue: formatAmount(0, "USD"),
    };
  }

  const currencyRate = await convertCurrency("USD", currentUser.currency);
  const convertedValue = formatAmount(
    amount * currencyRate.rates[currentUser.currency],
    currentUser.currency,
  );

  return {
    currencyValue: convertedValue,
    emptyValue: formatAmount(0, currentUser.currency),
  };
};
