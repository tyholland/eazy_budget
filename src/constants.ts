import { OFF_WHITE } from "./index.style.ts";

export const graphColors = [
  "#FFDBDB",
  "#FCFADE",
  "#DFF2FD",
  "#FFEEE2",
  "#E2FCE6",
  "#E3E3FF",
  "#CBE2B5",
  "#A6F1E0",
  "#F4F8D3",
  "#FFC785",
  "#CDC1FF",
  "#FFCCE1",
  "#A1EEBD",
  "#FFF6E3",
  "#D4F6FF",
];

export const listOfMonths = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
];

export const listOfBudgets = ["expense", "income"];

export const budgetSortOptions = [
  {
    id: 0,
    label: "A - Z",
  },
  {
    id: 1,
    label: "Z - A",
  },
  {
    id: 2,
    label: "High - Low",
  },
  {
    id: 3,
    label: "Low - High",
  },
];

export const budgetOptions = [
  {
    id: 0,
    label: "income",
  },
  {
    id: 1,
    label: "expense",
  },
];

export const viewOptions = [
  {
    id: 0,
    label: "Doughnut Chart",
  },
  {
    id: 1,
    label: "Pie Chart",
  },
  {
    id: 2,
    label: "Bar Graph",
  },
];

export const budgetViewMatch = [
  {
    label: "Doughnut Chart",
    type: "doughnut",
  },
  {
    label: "Pie Chart",
    type: "pie",
  },
  {
    label: "Bar Graph",
    type: "bar",
  },
];

export const subscriptionPlan = ["Grandfathered", "Free", "Starter", "Pro"];

export const budgetQuotes = [
  '"Budgeting your money is the key to having enough." by Elizabeth Warren',
  '"A budget is telling your money where to go instead of wondering where it went." by Dave Ramsey',
  '"A budget doesn\'t limit your freedom; it gives you freedom" by Rachel Cruze',
  "\"Don't tell me what you value, show me your budget, and I'll tell you what you value.\" by Joe Biden",
  '"Don\'t save what money is left after spending. Rather, only spend the money that remains after saving funds." by Warren Buffett',
  '"If you want to get rich, think of saving as earning" by Andrew Carnegie',
  '"A simple fact that is hard to learn is that the time to save money is when you have some." by Joe Moore',
  '"If you would be wealthy, think of saving as well as getting" by Benjamin Franklin',
  '"You must gain control over your money or the lack of it will forever control you." by Dave Ramsey',
];

export const frequencyOptions = [
  {
    id: 0,
    label: "Daily",
  },
  {
    id: 1,
    label: "Weekly",
  },
  {
    id: 2,
    label: "Semi-Monthly",
  },
  {
    id: 3,
    label: "Monthly",
  },
];

export const proPlanFrequencyOptions = [
  ...frequencyOptions,
  {
    id: 4,
    label: "Quarterly",
  },
  {
    id: 5,
    label: "Yearly",
  },
];

export const cadenceOptions = [
  {
    id: 0,
    label: "Current Month",
  },
  {
    id: 1,
    label: "Future Months",
  },
  {
    id: 2,
    label: "All Months",
  },
];

export const defaultModalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: OFF_WHITE,
  borderRadius: "20px",
  boxShadow: 24,
  p: 4,
};

export const MediumModalStyle = {
  ...defaultModalStyle,
  width: 500,
};

export const frequencyShortHandMap = {
  Daily: "business day",
  Weekly: "week",
  "Semi-Monthly": "twice a month",
  Monthly: "month",
  Quarterly: "quarter (March, June, Sept, Dec)",
  Yearly: "year",
};
