import {
  BudgetBodyInfo,
  BudgetData,
  BudgetDataItem,
  BudgetInsertIds,
} from "../types";

export const mockBudget: BudgetData[] = [
  {
    month: "january",
    year: 2025,
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
    frequency: "Bi-Weekly",
    cadence: "Current Month",
  },
  two: {
    label: "hulu",
    value: "20.99",
    checked: false,
    frequency: "Bi-Weekly",
    cadence: "Current Month",
  },
  three: {
    label: "internet",
    value: "70.70",
    checked: false,
    frequency: "Bi-Weekly",
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
  },
  {
    label: "hulu",
    value: 20.99,
    paid: false,
    frequency: "Monthly",
    cadence: "Current Month",
    budget_id: null,
    budget_date_id: null,
  },
  {
    label: "internet",
    value: 70.7,
    paid: false,
    frequency: "Monthly",
    cadence: "Current Month",
    budget_id: null,
    budget_date_id: null,
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
  },
  {
    label: "hulu",
    value: 83.96,
    paid: false,
    frequency: "Weekly",
    cadence: "Current Month",
    budget_id: null,
    budget_date_id: null,
  },
  {
    label: "internet",
    value: 282.8,
    paid: false,
    frequency: "Weekly",
    cadence: "Current Month",
    budget_id: null,
    budget_date_id: null,
  },
];

export const mockBudgetItemArray3: BudgetDataItem[] = [
  {
    label: "netflix",
    value: 39.98,
    paid: false,
    frequency: "Bi-Weekly",
    cadence: "Current Month",
    budget_id: null,
    budget_date_id: null,
  },
  {
    label: "hulu",
    value: 41.98,
    paid: false,
    frequency: "Bi-Weekly",
    cadence: "Current Month",
    budget_id: null,
    budget_date_id: null,
  },
  {
    label: "internet",
    value: 141.4,
    paid: false,
    frequency: "Bi-Weekly",
    cadence: "Current Month",
    budget_id: null,
    budget_date_id: null,
  },
];

export const mockBudgetItemArray4: BudgetDataItem[] = [
  {
    label: "netflix",
    value: 459.77,
    paid: false,
    frequency: "Daily",
    cadence: "Current Month",
    budget_id: null,
    budget_date_id: null,
  },
  {
    label: "hulu",
    value: 482.77,
    paid: false,
    frequency: "Daily",
    cadence: "Current Month",
    budget_id: null,
    budget_date_id: null,
  },
  {
    label: "internet",
    value: 1626.1,
    paid: false,
    frequency: "Daily",
    cadence: "Current Month",
    budget_id: null,
    budget_date_id: null,
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
  },
  {
    label: "hulu",
    value: 20.99,
    paid: false,
    frequency: "Quarterly",
    cadence: "Current Month",
    budget_id: null,
    budget_date_id: null,
  },
  {
    label: "internet",
    value: 70.7,
    paid: false,
    frequency: "Quarterly",
    cadence: "Current Month",
    budget_id: null,
    budget_date_id: null,
  },
];

export const mockBudgetTwo: BudgetData[] = [
  {
    year: 2025,
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
    year: 2025,
  },
  {
    label: "Netflix",
    type: "expense",
    amount: 19.99,
    paid: false,
    month: "january",
    year: 2025,
  },
  {
    label: "husband",
    type: "income",
    amount: 40000,
    paid: undefined,
    month: "february",
    year: 2025,
  },
  {
    label: "Netflix",
    type: "expense",
    amount: 19.99,
    paid: false,
    month: "february",
    year: 2025,
  },
  {
    label: "husband",
    type: "income",
    amount: 40000,
    paid: undefined,
    month: "march",
    year: 2025,
  },
  {
    label: "Netflix",
    type: "expense",
    amount: 19.99,
    paid: false,
    month: "march",
    year: 2025,
  },
  {
    label: "husband",
    type: "income",
    amount: 40000,
    paid: undefined,
    month: "april",
    year: 2025,
  },
  {
    label: "Netflix",
    type: "expense",
    amount: 19.99,
    paid: false,
    month: "april",
    year: 2025,
  },
  {
    label: "husband",
    type: "income",
    amount: 40000,
    paid: undefined,
    month: "may",
    year: 2025,
  },
  {
    label: "Netflix",
    type: "expense",
    amount: 19.99,
    paid: false,
    month: "may",
    year: 2025,
  },
  {
    label: "husband",
    type: "income",
    amount: 40000,
    paid: undefined,
    month: "june",
    year: 2025,
  },
  {
    label: "Netflix",
    type: "expense",
    amount: 19.99,
    paid: false,
    month: "june",
    year: 2025,
  },
  {
    label: "husband",
    type: "income",
    amount: 40000,
    paid: undefined,
    month: "july",
    year: 2025,
  },
  {
    label: "Netflix",
    type: "expense",
    amount: 19.99,
    paid: false,
    month: "july",
    year: 2025,
  },
  {
    label: "husband",
    type: "income",
    amount: 40000,
    paid: undefined,
    month: "august",
    year: 2025,
  },
  {
    label: "Netflix",
    type: "expense",
    amount: 19.99,
    paid: false,
    month: "august",
    year: 2025,
  },
  {
    label: "husband",
    type: "income",
    amount: 40000,
    paid: undefined,
    month: "september",
    year: 2025,
  },
  {
    label: "Netflix",
    type: "expense",
    amount: 19.99,
    paid: false,
    month: "september",
    year: 2025,
  },
  {
    label: "husband",
    type: "income",
    amount: 40000,
    paid: undefined,
    month: "october",
    year: 2025,
  },
  {
    label: "Netflix",
    type: "expense",
    amount: 19.99,
    paid: false,
    month: "october",
    year: 2025,
  },
  {
    label: "husband",
    type: "income",
    amount: 40000,
    paid: undefined,
    month: "november",
    year: 2025,
  },
  {
    label: "Netflix",
    type: "expense",
    amount: 19.99,
    paid: false,
    month: "november",
    year: 2025,
  },
  {
    label: "husband",
    type: "income",
    amount: 40000,
    paid: undefined,
    month: "december",
    year: 2025,
  },
  {
    label: "Netflix",
    type: "expense",
    amount: 19.99,
    paid: false,
    month: "december",
    year: 2025,
  },
];

export const mockBudgetFull: BudgetData[] = [
  {
    year: 2025,
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
    year: 2025,
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
    year: 2025,
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
    year: 2025,
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
    year: 2025,
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
    year: 2025,
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
    year: 2025,
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
    year: 2025,
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
    year: 2025,
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
    year: 2025,
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
    year: 2025,
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
    year: 2025,
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
    year: 2025,
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
    year: 2025,
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
    year: 2025,
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
    year: 2025,
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
    year: 2025,
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
    year: 2025,
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
    year: 2025,
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
    year: 2025,
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
    year: 2025,
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
    year: 2025,
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
    year: 2025,
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
    year: 2025,
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
    year: 2025,
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
    year: 2025,
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
    year: 2025,
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
    year: 2025,
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
    year: 2025,
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
    year: 2025,
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
    year: 2025,
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
    year: 2025,
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
    year: 2025,
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
    year: 2025,
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
    year: 2025,
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
    year: 2025,
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
