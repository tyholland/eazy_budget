import { BudgetBodyInfo, BudgetData, BudgetDataItem } from "../types";

export const mockBudget: BudgetData[] = [
  {
    month: "january",
    year: 2025,
    income: [
      {
        label: "husband",
        value: 40000,
        budget_id: null,
      },
      {
        label: "wife",
        value: 30000,
        budget_id: null,
      },
    ],
    expense: [
      {
        label: "Netflix",
        value: 19,
        budget_id: null,
      },
      {
        label: "Hulu",
        value: 17,
        budget_id: null,
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
  },
  {
    label: "hulu",
    value: 20.99,
    paid: false,
    budget_id: null,
  },
  {
    label: "internet",
    value: 70.7,
    paid: false,
    budget_id: null,
  },
];

export const mockBudgetBody: BudgetBodyInfo[] = [
  {
    label: "Netflix",
    type: "expense",
    amount: 19.99,
    paid: false,
    month: "january",
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
    label: "Netflix",
    type: "expense",
    amount: 19.99,
    paid: false,
    month: "march",
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
    label: "Netflix",
    type: "expense",
    amount: 19.99,
    paid: false,
    month: "may",
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
    label: "Netflix",
    type: "expense",
    amount: 19.99,
    paid: false,
    month: "july",
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
    label: "Netflix",
    type: "expense",
    amount: 19.99,
    paid: false,
    month: "september",
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
    label: "Netflix",
    type: "expense",
    amount: 19.99,
    paid: false,
    month: "november",
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
  {
    label: "husband",
    type: "income",
    amount: 40000,
    paid: undefined,
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
    label: "husband",
    type: "income",
    amount: 40000,
    paid: undefined,
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
    label: "husband",
    type: "income",
    amount: 40000,
    paid: undefined,
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
    label: "husband",
    type: "income",
    amount: 40000,
    paid: undefined,
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
    label: "husband",
    type: "income",
    amount: 40000,
    paid: undefined,
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
    label: "husband",
    type: "income",
    amount: 40000,
    paid: undefined,
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
];

export const mockBudgetFull: BudgetData[] = [
  {
    year: 2025,
    month: "january",
    income: [
      {
        label: "husband",
        value: 40000,
        budget_id: 13,
      },
    ],
    expense: [
      {
        label: "Netflix",
        value: 19.99,
        paid: false,
        budget_id: 1,
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
        budget_id: 14,
      },
    ],
    expense: [
      {
        label: "Netflix",
        value: 19.99,
        paid: false,
        budget_id: 2,
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
        budget_id: 15,
      },
    ],
    expense: [
      {
        label: "Netflix",
        value: 19.99,
        paid: false,
        budget_id: 3,
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
        budget_id: 16,
      },
    ],
    expense: [
      {
        label: "Netflix",
        value: 19.99,
        paid: false,
        budget_id: 4,
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
        budget_id: 17,
      },
    ],
    expense: [
      {
        label: "Netflix",
        value: 19.99,
        paid: false,
        budget_id: 5,
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
        budget_id: 18,
      },
    ],
    expense: [
      {
        label: "Netflix",
        value: 19.99,
        paid: false,
        budget_id: 6,
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
        budget_id: 19,
      },
    ],
    expense: [
      {
        label: "Netflix",
        value: 19.99,
        paid: false,
        budget_id: 7,
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
        budget_id: 20,
      },
    ],
    expense: [
      {
        label: "Netflix",
        value: 19.99,
        paid: false,
        budget_id: 8,
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
        budget_id: 21,
      },
    ],
    expense: [
      {
        label: "Netflix",
        value: 19.99,
        paid: false,
        budget_id: 9,
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
        budget_id: 22,
      },
    ],
    expense: [
      {
        label: "Netflix",
        value: 19.99,
        paid: false,
        budget_id: 10,
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
        budget_id: 23,
      },
    ],
    expense: [
      {
        label: "Netflix",
        value: 19.99,
        paid: false,
        budget_id: 11,
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
        budget_id: 24,
      },
    ],
    expense: [
      {
        label: "Netflix",
        value: 19.99,
        paid: false,
        budget_id: 12,
      },
    ],
  },
];

export const mockBudgetInsertIds: string[] = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
  "21",
  "22",
  "23",
  "24",
];
