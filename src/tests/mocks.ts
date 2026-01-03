import {
  BudgetBodyInfo,
  BudgetData,
  BudgetDataItem,
  BudgetInsertIds,
} from "../types";

const currentYear = new Date().getFullYear();

export const mockBudget: BudgetData[] = [
  {
    month: "january",
    year: currentYear,
    income: [
      {
        label: "husband",
        value: 40000,
        budget_id: null,
        budget_date_id: null,
      },
      {
        label: "wife",
        value: 30000,
        budget_id: null,
        budget_date_id: null,
      },
    ],
    expense: [
      {
        label: "Netflix",
        value: 19,
        budget_id: null,
        budget_date_id: null,
        paid: true,
      },
      {
        label: "Hulu",
        value: 17,
        budget_id: null,
        budget_date_id: null,
        paid: false,
      },
    ],
  },
];

export const mockBudgetEntries: Object = {
  one: {
    label: "netflix",
    value: "19.99",
    checked: false,
    frequency: "Monthly",
    cadence: "Current Month",
  },
  two: {
    label: "hulu",
    value: "20.99",
    checked: false,
    frequency: "Monthly",
    cadence: "Current Month",
  },
  three: {
    label: "internet",
    value: "70.70",
    checked: false,
    frequency: "Monthly",
    cadence: "Current Month",
  },
};

export const mockBudgetEntries2: Object = {
  one: {
    label: "netflix",
    value: "19.99",
    checked: false,
    frequency: "Weekly",
    cadence: "Current Month",
  },
  two: {
    label: "hulu",
    value: "20.99",
    checked: false,
    frequency: "Weekly",
    cadence: "Current Month",
  },
  three: {
    label: "internet",
    value: "70.70",
    checked: false,
    frequency: "Weekly",
    cadence: "Current Month",
  },
};

export const mockBudgetEntries3: Object = {
  one: {
    label: "netflix",
    value: "19.99",
    checked: false,
    frequency: "Semi-Monthly",
    cadence: "Current Month",
  },
  two: {
    label: "hulu",
    value: "20.99",
    checked: false,
    frequency: "Semi-Monthly",
    cadence: "Current Month",
  },
  three: {
    label: "internet",
    value: "70.70",
    checked: false,
    frequency: "Semi-Monthly",
    cadence: "Current Month",
  },
};

export const mockBudgetEntries4: Object = {
  one: {
    label: "netflix",
    value: "19.99",
    checked: false,
    frequency: "Daily",
    cadence: "Current Month",
  },
  two: {
    label: "hulu",
    value: "20.99",
    checked: false,
    frequency: "Daily",
    cadence: "Current Month",
  },
  three: {
    label: "internet",
    value: "70.70",
    checked: false,
    frequency: "Daily",
    cadence: "Current Month",
  },
};

export const mockBudgetEntries5: Object = {
  one: {
    label: "netflix",
    value: "19.99",
    checked: false,
    frequency: "Quarterly",
    cadence: "Current Month",
  },
  two: {
    label: "hulu",
    value: "20.99",
    checked: false,
    frequency: "Quarterly",
    cadence: "Current Month",
  },
  three: {
    label: "internet",
    value: "70.70",
    checked: false,
    frequency: "Quarterly",
    cadence: "Current Month",
  },
};

export const mockBudgetEntriesNoDollar: Object = {
  netflix: 19.99,
  hulu: 20.99,
  internet: 70.7,
};

export const mockBudgetItemArray: BudgetDataItem[] = [
  {
    label: "netflix",
    value: 19.99,
    paid: false,
    frequency: "Monthly",
    cadence: "Current Month",
    budget_id: null,
    budget_date_id: null,
    temp: false,
  },
  {
    label: "hulu",
    value: 20.99,
    paid: false,
    frequency: "Monthly",
    cadence: "Current Month",
    budget_id: null,
    budget_date_id: null,
    temp: false,
  },
  {
    label: "internet",
    value: 70.7,
    paid: false,
    frequency: "Monthly",
    cadence: "Current Month",
    budget_id: null,
    budget_date_id: null,
    temp: false,
  },
];

export const mockBudgetItemArray2: BudgetDataItem[] = [
  {
    label: "netflix",
    value: 79.96,
    paid: false,
    frequency: "Weekly",
    cadence: "Current Month",
    budget_id: null,
    budget_date_id: null,
    temp: false,
  },
  {
    label: "hulu",
    value: 83.96,
    paid: false,
    frequency: "Weekly",
    cadence: "Current Month",
    budget_id: null,
    budget_date_id: null,
    temp: false,
  },
  {
    label: "internet",
    value: 282.8,
    paid: false,
    frequency: "Weekly",
    cadence: "Current Month",
    budget_id: null,
    budget_date_id: null,
    temp: false,
  },
];

export const mockBudgetItemArray3: BudgetDataItem[] = [
  {
    label: "netflix",
    value: 39.98,
    paid: false,
    frequency: "Semi-Monthly",
    cadence: "Current Month",
    budget_id: null,
    budget_date_id: null,
    temp: false,
  },
  {
    label: "hulu",
    value: 41.98,
    paid: false,
    frequency: "Semi-Monthly",
    cadence: "Current Month",
    budget_id: null,
    budget_date_id: null,
    temp: false,
  },
  {
    label: "internet",
    value: 141.4,
    paid: false,
    frequency: "Semi-Monthly",
    cadence: "Current Month",
    budget_id: null,
    budget_date_id: null,
    temp: false,
  },
];

export const mockBudgetItemArray4: BudgetDataItem[] = [
  {
    label: "netflix",
    value: 439.78,
    paid: false,
    frequency: "Daily",
    cadence: "Current Month",
    budget_id: null,
    budget_date_id: null,
    temp: false,
  },
  {
    label: "hulu",
    value: 461.78,
    paid: false,
    frequency: "Daily",
    cadence: "Current Month",
    budget_id: null,
    budget_date_id: null,
    temp: false,
  },
  {
    label: "internet",
    value: 1555.4,
    paid: false,
    frequency: "Daily",
    cadence: "Current Month",
    budget_id: null,
    budget_date_id: null,
    temp: false,
  },
];

export const mockBudgetItemArray5: BudgetDataItem[] = [
  {
    label: "netflix",
    value: 19.99,
    paid: false,
    frequency: "Quarterly",
    cadence: "Current Month",
    budget_id: null,
    budget_date_id: null,
    temp: false,
  },
  {
    label: "hulu",
    value: 20.99,
    paid: false,
    frequency: "Quarterly",
    cadence: "Current Month",
    budget_id: null,
    budget_date_id: null,
    temp: false,
  },
  {
    label: "internet",
    value: 70.7,
    paid: false,
    frequency: "Quarterly",
    cadence: "Current Month",
    budget_id: null,
    budget_date_id: null,
    temp: false,
  },
];

export const mockBudgetTwo: BudgetData[] = [
  {
    year: currentYear,
    month: "january",
    income: [
      {
        label: "husband",
        value: 40000,
        budget_id: null,
        budget_date_id: null,
      },
    ],
    expense: [
      {
        label: "Netflix",
        value: 19.99,
        budget_id: null,
        budget_date_id: null,
        paid: false,
      },
    ],
  },
];

export const mockBudgetBody: BudgetBodyInfo[] = [
  {
    label: "husband",
    type: "income",
    amount: 40000,
    paid: undefined,
    month: "january",
    year: currentYear,
  },
  {
    label: "Netflix",
    type: "expense",
    amount: 19.99,
    paid: false,
    month: "january",
    year: currentYear,
  },
  {
    label: "husband",
    type: "income",
    amount: 40000,
    paid: undefined,
    month: "february",
    year: currentYear,
  },
  {
    label: "Netflix",
    type: "expense",
    amount: 19.99,
    paid: false,
    month: "february",
    year: currentYear,
  },
  {
    label: "husband",
    type: "income",
    amount: 40000,
    paid: undefined,
    month: "march",
    year: currentYear,
  },
  {
    label: "Netflix",
    type: "expense",
    amount: 19.99,
    paid: false,
    month: "march",
    year: currentYear,
  },
  {
    label: "husband",
    type: "income",
    amount: 40000,
    paid: undefined,
    month: "april",
    year: currentYear,
  },
  {
    label: "Netflix",
    type: "expense",
    amount: 19.99,
    paid: false,
    month: "april",
    year: currentYear,
  },
  {
    label: "husband",
    type: "income",
    amount: 40000,
    paid: undefined,
    month: "may",
    year: currentYear,
  },
  {
    label: "Netflix",
    type: "expense",
    amount: 19.99,
    paid: false,
    month: "may",
    year: currentYear,
  },
  {
    label: "husband",
    type: "income",
    amount: 40000,
    paid: undefined,
    month: "june",
    year: currentYear,
  },
  {
    label: "Netflix",
    type: "expense",
    amount: 19.99,
    paid: false,
    month: "june",
    year: currentYear,
  },
  {
    label: "husband",
    type: "income",
    amount: 40000,
    paid: undefined,
    month: "july",
    year: currentYear,
  },
  {
    label: "Netflix",
    type: "expense",
    amount: 19.99,
    paid: false,
    month: "july",
    year: currentYear,
  },
  {
    label: "husband",
    type: "income",
    amount: 40000,
    paid: undefined,
    month: "august",
    year: currentYear,
  },
  {
    label: "Netflix",
    type: "expense",
    amount: 19.99,
    paid: false,
    month: "august",
    year: currentYear,
  },
  {
    label: "husband",
    type: "income",
    amount: 40000,
    paid: undefined,
    month: "september",
    year: currentYear,
  },
  {
    label: "Netflix",
    type: "expense",
    amount: 19.99,
    paid: false,
    month: "september",
    year: currentYear,
  },
  {
    label: "husband",
    type: "income",
    amount: 40000,
    paid: undefined,
    month: "october",
    year: currentYear,
  },
  {
    label: "Netflix",
    type: "expense",
    amount: 19.99,
    paid: false,
    month: "october",
    year: currentYear,
  },
  {
    label: "husband",
    type: "income",
    amount: 40000,
    paid: undefined,
    month: "november",
    year: currentYear,
  },
  {
    label: "Netflix",
    type: "expense",
    amount: 19.99,
    paid: false,
    month: "november",
    year: currentYear,
  },
  {
    label: "husband",
    type: "income",
    amount: 40000,
    paid: undefined,
    month: "december",
    year: currentYear,
  },
  {
    label: "Netflix",
    type: "expense",
    amount: 19.99,
    paid: false,
    month: "december",
    year: currentYear,
  },
];

export const mockBudgetFull: BudgetData[] = [
  {
    year: currentYear,
    month: "january",
    income: [
      {
        label: "husband",
        value: 40000,
        budget_id: 1,
        budget_date_id: 1,
      },
    ],
    expense: [
      {
        label: "Netflix",
        value: 19.99,
        paid: false,
        budget_id: 2,
        budget_date_id: 1,
      },
    ],
  },
  {
    year: currentYear,
    month: "february",
    income: [
      {
        label: "husband",
        value: 40000,
        budget_id: 3,
        budget_date_id: 2,
      },
    ],
    expense: [
      {
        label: "Netflix",
        value: 19.99,
        paid: false,
        budget_id: 4,
        budget_date_id: 2,
      },
    ],
  },
  {
    year: currentYear,
    month: "march",
    income: [
      {
        label: "husband",
        value: 40000,
        budget_id: 5,
        budget_date_id: 3,
      },
    ],
    expense: [
      {
        label: "Netflix",
        value: 19.99,
        paid: false,
        budget_id: 6,
        budget_date_id: 3,
      },
    ],
  },
  {
    year: currentYear,
    month: "april",
    income: [
      {
        label: "husband",
        value: 40000,
        budget_id: 7,
        budget_date_id: 4,
      },
    ],
    expense: [
      {
        label: "Netflix",
        value: 19.99,
        paid: false,
        budget_id: 8,
        budget_date_id: 4,
      },
    ],
  },
  {
    year: currentYear,
    month: "may",
    income: [
      {
        label: "husband",
        value: 40000,
        budget_id: 9,
        budget_date_id: 5,
      },
    ],
    expense: [
      {
        label: "Netflix",
        value: 19.99,
        paid: false,
        budget_id: 10,
        budget_date_id: 5,
      },
    ],
  },
  {
    year: currentYear,
    month: "june",
    income: [
      {
        label: "husband",
        value: 40000,
        budget_id: 11,
        budget_date_id: 6,
      },
    ],
    expense: [
      {
        label: "Netflix",
        value: 19.99,
        paid: false,
        budget_id: 12,
        budget_date_id: 6,
      },
    ],
  },
  {
    year: currentYear,
    month: "july",
    income: [
      {
        label: "husband",
        value: 40000,
        budget_id: 13,
        budget_date_id: 7,
      },
    ],
    expense: [
      {
        label: "Netflix",
        value: 19.99,
        paid: false,
        budget_id: 14,
        budget_date_id: 7,
      },
    ],
  },
  {
    year: currentYear,
    month: "august",
    income: [
      {
        label: "husband",
        value: 40000,
        budget_id: 15,
        budget_date_id: 8,
      },
    ],
    expense: [
      {
        label: "Netflix",
        value: 19.99,
        paid: false,
        budget_id: 16,
        budget_date_id: 8,
      },
    ],
  },
  {
    year: currentYear,
    month: "september",
    income: [
      {
        label: "husband",
        value: 40000,
        budget_id: 17,
        budget_date_id: 9,
      },
    ],
    expense: [
      {
        label: "Netflix",
        value: 19.99,
        paid: false,
        budget_id: 18,
        budget_date_id: 9,
      },
    ],
  },
  {
    year: currentYear,
    month: "october",
    income: [
      {
        label: "husband",
        value: 40000,
        budget_id: 19,
        budget_date_id: 10,
      },
    ],
    expense: [
      {
        label: "Netflix",
        value: 19.99,
        paid: false,
        budget_id: 20,
        budget_date_id: 10,
      },
    ],
  },
  {
    year: currentYear,
    month: "november",
    income: [
      {
        label: "husband",
        value: 40000,
        budget_id: 21,
        budget_date_id: 11,
      },
    ],
    expense: [
      {
        label: "Netflix",
        value: 19.99,
        paid: false,
        budget_id: 22,
        budget_date_id: 11,
      },
    ],
  },
  {
    year: currentYear,
    month: "december",
    income: [
      {
        label: "husband",
        value: 40000,
        budget_id: 23,
        budget_date_id: 12,
      },
    ],
    expense: [
      {
        label: "Netflix",
        value: 19.99,
        paid: false,
        budget_id: 24,
        budget_date_id: 12,
      },
    ],
  },
];

export const mockBudgetInsertIds: BudgetInsertIds[] = [
  {
    budget_id: 1,
    budget_date_id: 1,
  },
  {
    budget_id: 2,
    budget_date_id: 1,
  },
  {
    budget_id: 3,
    budget_date_id: 2,
  },
  {
    budget_id: 4,
    budget_date_id: 2,
  },
  {
    budget_id: 5,
    budget_date_id: 3,
  },
  {
    budget_id: 6,
    budget_date_id: 3,
  },
  {
    budget_id: 7,
    budget_date_id: 4,
  },
  {
    budget_id: 8,
    budget_date_id: 4,
  },
  {
    budget_id: 9,
    budget_date_id: 5,
  },
  {
    budget_id: 10,
    budget_date_id: 5,
  },
  {
    budget_id: 11,
    budget_date_id: 6,
  },
  {
    budget_id: 12,
    budget_date_id: 6,
  },
  {
    budget_id: 13,
    budget_date_id: 7,
  },
  {
    budget_id: 14,
    budget_date_id: 7,
  },
  {
    budget_id: 15,
    budget_date_id: 8,
  },
  {
    budget_id: 16,
    budget_date_id: 8,
  },
  {
    budget_id: 17,
    budget_date_id: 9,
  },
  {
    budget_id: 18,
    budget_date_id: 9,
  },
  {
    budget_id: 19,
    budget_date_id: 10,
  },
  {
    budget_id: 20,
    budget_date_id: 10,
  },
  {
    budget_id: 21,
    budget_date_id: 11,
  },
  {
    budget_id: 22,
    budget_date_id: 11,
  },
  {
    budget_id: 23,
    budget_date_id: 12,
  },
  {
    budget_id: 24,
    budget_date_id: 12,
  },
];

export const mockBudgetFullUpdated: BudgetData[] = [
  {
    year: currentYear,
    month: "january",
    income: [
      {
        label: "husband",
        value: 55000,
        budget_id: 1,
        budget_date_id: 1,
        frequency: "Monthly",
      },
    ],
    expense: [
      {
        label: "Netflix",
        value: 39.5,
        paid: false,
        budget_id: 2,
        budget_date_id: 1,
        frequency: "Monthly",
        cadence: "Current Month",
      },
    ],
  },
  {
    year: currentYear,
    month: "february",
    income: [
      {
        label: "husband",
        value: 35000,
        budget_id: 3,
        budget_date_id: 2,
        frequency: "Monthly",
        cadence: "Future Months",
      },
    ],
    expense: [
      {
        label: "Netflix",
        value: 9.99,
        paid: false,
        budget_id: 4,
        budget_date_id: 2,
        frequency: "Monthly",
        cadence: "All Months",
      },
    ],
  },
  {
    year: currentYear,
    month: "march",
    income: [
      {
        label: "husband",
        value: 20000,
        budget_id: 5,
        budget_date_id: 3,
        frequency: "Quarterly",
        cadence: "All Months",
      },
    ],
    expense: [
      {
        label: "Netflix",
        value: 19.99,
        paid: false,
        budget_id: 6,
        budget_date_id: 3,
      },
    ],
  },
  {
    year: currentYear,
    month: "april",
    income: [
      {
        label: "husband",
        value: 40000,
        budget_id: 7,
        budget_date_id: 4,
      },
    ],
    expense: [
      {
        label: "Netflix",
        value: 19.99,
        paid: false,
        budget_id: 8,
        budget_date_id: 4,
      },
    ],
  },
  {
    year: currentYear,
    month: "may",
    income: [
      {
        label: "husband",
        value: 40000,
        budget_id: 9,
        budget_date_id: 5,
      },
    ],
    expense: [
      {
        label: "Netflix",
        value: 19.99,
        paid: false,
        budget_id: 10,
        budget_date_id: 5,
      },
    ],
  },
  {
    year: currentYear,
    month: "june",
    income: [
      {
        label: "husband",
        value: 40000,
        budget_id: 11,
        budget_date_id: 6,
      },
    ],
    expense: [
      {
        label: "Netflix",
        value: 19.99,
        paid: false,
        budget_id: 12,
        budget_date_id: 6,
      },
    ],
  },
  {
    year: currentYear,
    month: "july",
    income: [
      {
        label: "husband",
        value: 40000,
        budget_id: 13,
        budget_date_id: 7,
      },
    ],
    expense: [
      {
        label: "Netflix",
        value: 19.99,
        paid: false,
        budget_id: 14,
        budget_date_id: 7,
      },
    ],
  },
  {
    year: currentYear,
    month: "august",
    income: [
      {
        label: "husband",
        value: 40000,
        budget_id: 15,
        budget_date_id: 8,
      },
    ],
    expense: [
      {
        label: "Netflix",
        value: 19.99,
        paid: false,
        budget_id: 16,
        budget_date_id: 8,
      },
    ],
  },
  {
    year: currentYear,
    month: "september",
    income: [
      {
        label: "husband",
        value: 40000,
        budget_id: 17,
        budget_date_id: 9,
      },
    ],
    expense: [
      {
        label: "Netflix",
        value: 19.99,
        paid: false,
        budget_id: 18,
        budget_date_id: 9,
      },
    ],
  },
  {
    year: currentYear,
    month: "october",
    income: [
      {
        label: "husband",
        value: 40000,
        budget_id: 19,
        budget_date_id: 10,
      },
    ],
    expense: [
      {
        label: "Netflix",
        value: 19.99,
        paid: false,
        budget_id: 20,
        budget_date_id: 10,
      },
    ],
  },
  {
    year: currentYear,
    month: "november",
    income: [
      {
        label: "husband",
        value: 40000,
        budget_id: 21,
        budget_date_id: 11,
      },
    ],
    expense: [
      {
        label: "Netflix",
        value: 19.99,
        paid: false,
        budget_id: 22,
        budget_date_id: 11,
      },
    ],
  },
  {
    year: currentYear,
    month: "december",
    income: [
      {
        label: "husband",
        value: 40000,
        budget_id: 23,
        budget_date_id: 12,
      },
    ],
    expense: [
      {
        label: "Netflix",
        value: 19.99,
        paid: false,
        budget_id: 24,
        budget_date_id: 12,
      },
    ],
  },
];

export const mockBudgetFullInserted: BudgetData[] = [
  {
    year: currentYear,
    month: "january",
    income: [
      {
        label: "husband",
        value: 55000,
        budget_id: 1,
        budget_date_id: 1,
        frequency: "Monthly",
      },
      {
        label: "wife",
        value: 75000,
        budget_id: null,
        budget_date_id: 1,
        frequency: "Monthly",
      },
    ],
    expense: [
      {
        label: "Netflix",
        value: 39.5,
        paid: false,
        budget_id: 2,
        budget_date_id: 1,
        frequency: "Monthly",
        cadence: "Current Month",
      },
      {
        label: "Hulu",
        value: 20,
        paid: false,
        budget_id: null,
        budget_date_id: 1,
        frequency: "Monthly",
        cadence: "Current Month",
      },
    ],
  },
  {
    year: currentYear,
    month: "february",
    income: [
      {
        label: "husband",
        value: 35000,
        budget_id: 3,
        budget_date_id: 2,
        frequency: "Monthly",
        cadence: "Future Months",
      },
      {
        label: "wife",
        value: 55000,
        budget_id: null,
        budget_date_id: 2,
        frequency: "Monthly",
        cadence: "Future Months",
      },
    ],
    expense: [
      {
        label: "Netflix",
        value: 9.99,
        paid: false,
        budget_id: 4,
        budget_date_id: 2,
        frequency: "Monthly",
        cadence: "All Months",
      },
      {
        label: "Hulu",
        value: 12,
        paid: false,
        budget_id: null,
        budget_date_id: 2,
        frequency: "Monthly",
        cadence: "All Months",
      },
    ],
  },
  {
    year: currentYear,
    month: "march",
    income: [
      {
        label: "husband",
        value: 20000,
        budget_id: 5,
        budget_date_id: 3,
        frequency: "Quarterly",
        cadence: "All Months",
      },
      {
        label: "wife",
        value: 35000,
        budget_id: null,
        budget_date_id: 3,
        frequency: "Quarterly",
        cadence: "All Months",
      },
    ],
    expense: [
      {
        label: "Netflix",
        value: 19.99,
        paid: false,
        budget_id: 6,
        budget_date_id: 3,
      },
      {
        label: "Hulu",
        value: 12,
        paid: false,
        budget_id: null,
        budget_date_id: 3,
        frequency: "Monthly",
        cadence: "All Months",
      },
    ],
  },
  {
    year: currentYear,
    month: "april",
    income: [
      {
        label: "husband",
        value: 40000,
        budget_id: 7,
        budget_date_id: 4,
      },
      {
        label: "wife",
        value: 55000,
        budget_id: null,
        budget_date_id: 4,
        frequency: "Monthly",
        cadence: "Future Months",
      },
    ],
    expense: [
      {
        label: "Netflix",
        value: 19.99,
        paid: false,
        budget_id: 8,
        budget_date_id: 4,
      },
      {
        label: "Hulu",
        value: 12,
        paid: false,
        budget_id: null,
        budget_date_id: 4,
        frequency: "Monthly",
        cadence: "All Months",
      },
    ],
  },
  {
    year: currentYear,
    month: "may",
    income: [
      {
        label: "husband",
        value: 40000,
        budget_id: 9,
        budget_date_id: 5,
      },
      {
        label: "wife",
        value: 55000,
        budget_id: null,
        budget_date_id: 5,
        frequency: "Monthly",
        cadence: "Future Months",
      },
    ],
    expense: [
      {
        label: "Netflix",
        value: 19.99,
        paid: false,
        budget_id: 10,
        budget_date_id: 5,
      },
      {
        label: "Hulu",
        value: 12,
        paid: false,
        budget_id: null,
        budget_date_id: 5,
        frequency: "Monthly",
        cadence: "All Months",
      },
    ],
  },
  {
    year: currentYear,
    month: "june",
    income: [
      {
        label: "husband",
        value: 40000,
        budget_id: 11,
        budget_date_id: 6,
      },
      {
        label: "wife",
        value: 55000,
        budget_id: null,
        budget_date_id: 6,
        frequency: "Monthly",
        cadence: "Future Months",
      },
    ],
    expense: [
      {
        label: "Netflix",
        value: 19.99,
        paid: false,
        budget_id: 12,
        budget_date_id: 6,
      },
      {
        label: "Hulu",
        value: 12,
        paid: false,
        budget_id: null,
        budget_date_id: 6,
        frequency: "Monthly",
        cadence: "All Months",
      },
    ],
  },
  {
    year: currentYear,
    month: "july",
    income: [
      {
        label: "husband",
        value: 40000,
        budget_id: 13,
        budget_date_id: 7,
      },
      {
        label: "wife",
        value: 55000,
        budget_id: null,
        budget_date_id: 7,
        frequency: "Monthly",
        cadence: "Future Months",
      },
    ],
    expense: [
      {
        label: "Netflix",
        value: 19.99,
        paid: false,
        budget_id: 14,
        budget_date_id: 7,
      },
      {
        label: "Hulu",
        value: 12,
        paid: false,
        budget_id: null,
        budget_date_id: 7,
        frequency: "Monthly",
        cadence: "All Months",
      },
    ],
  },
  {
    year: currentYear,
    month: "august",
    income: [
      {
        label: "husband",
        value: 40000,
        budget_id: 15,
        budget_date_id: 8,
      },
      {
        label: "wife",
        value: 55000,
        budget_id: null,
        budget_date_id: 8,
        frequency: "Monthly",
        cadence: "Future Months",
      },
    ],
    expense: [
      {
        label: "Netflix",
        value: 19.99,
        paid: false,
        budget_id: 16,
        budget_date_id: 8,
      },
      {
        label: "Hulu",
        value: 12,
        paid: false,
        budget_id: null,
        budget_date_id: 8,
        frequency: "Monthly",
        cadence: "All Months",
      },
    ],
  },
  {
    year: currentYear,
    month: "september",
    income: [
      {
        label: "husband",
        value: 40000,
        budget_id: 17,
        budget_date_id: 9,
      },
      {
        label: "wife",
        value: 55000,
        budget_id: null,
        budget_date_id: 9,
        frequency: "Monthly",
        cadence: "Future Months",
      },
    ],
    expense: [
      {
        label: "Netflix",
        value: 19.99,
        paid: false,
        budget_id: 18,
        budget_date_id: 9,
      },
      {
        label: "Hulu",
        value: 12,
        paid: false,
        budget_id: null,
        budget_date_id: 9,
        frequency: "Monthly",
        cadence: "All Months",
      },
    ],
  },
  {
    year: currentYear,
    month: "october",
    income: [
      {
        label: "husband",
        value: 40000,
        budget_id: 19,
        budget_date_id: 10,
      },
      {
        label: "wife",
        value: 55000,
        budget_id: null,
        budget_date_id: 10,
        frequency: "Monthly",
        cadence: "Future Months",
      },
    ],
    expense: [
      {
        label: "Netflix",
        value: 19.99,
        paid: false,
        budget_id: 20,
        budget_date_id: 10,
      },
      {
        label: "Hulu",
        value: 12,
        paid: false,
        budget_id: null,
        budget_date_id: 10,
        frequency: "Monthly",
        cadence: "All Months",
      },
    ],
  },
  {
    year: currentYear,
    month: "november",
    income: [
      {
        label: "husband",
        value: 40000,
        budget_id: 21,
        budget_date_id: 11,
      },
      {
        label: "wife",
        value: 55000,
        budget_id: null,
        budget_date_id: 11,
        frequency: "Monthly",
        cadence: "Future Months",
      },
    ],
    expense: [
      {
        label: "Netflix",
        value: 19.99,
        paid: false,
        budget_id: 22,
        budget_date_id: 11,
      },
      {
        label: "Hulu",
        value: 12,
        paid: false,
        budget_id: null,
        budget_date_id: 11,
        frequency: "Monthly",
        cadence: "All Months",
      },
    ],
  },
  {
    year: currentYear,
    month: "december",
    income: [
      {
        label: "husband",
        value: 40000,
        budget_id: 23,
        budget_date_id: 12,
      },
      {
        label: "wife",
        value: 55000,
        budget_id: null,
        budget_date_id: 12,
        frequency: "Monthly",
        cadence: "Future Months",
      },
    ],
    expense: [
      {
        label: "Netflix",
        value: 19.99,
        paid: false,
        budget_id: 24,
        budget_date_id: 12,
      },
      {
        label: "Hulu",
        value: 12,
        paid: false,
        budget_id: null,
        budget_date_id: 12,
        frequency: "Monthly",
        cadence: "All Months",
      },
    ],
  },
];
