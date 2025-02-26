import BudgetItem from "../views/BudgetItem/BudgetItem.tsx";

export default {
  title: "Views/BudgetItem",
  component: BudgetItem,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export const Primary = {
  args: {
    monthType: "expense",
    item: {
      label: "Hulu",
      value: 19.99,
    },
  },
};
