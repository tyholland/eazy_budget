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

export const mockBudgetEntries = {
  netflix: "$19.99",
  hulu: "$20.99",
  internet: "$70.70",
};

export const mockBudgetEntriesNoDollar = {
  netflix: 19.99,
  hulu: 20.99,
  internet: 70.7,
};

export const mockBudgetItemArray: BudgetDataItem[] = [
  {
    label: "netflix",
    value: 19.99,
    paid: false,
    budget_id: null,
    budget_date_id: null,
  },
  {
    label: "hulu",
    value: 20.99,
    paid: false,
    budget_id: null,
    budget_date_id: null,
  },
  {
    label: "internet",
    value: 70.7,
    paid: false,
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
