export const mockBudget = [
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

export const mockBudgetItemArray = [
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
