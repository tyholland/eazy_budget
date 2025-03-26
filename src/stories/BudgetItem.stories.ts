import BudgetItem from "../views/BudgetItem/BudgetItem.tsx";

const BudgetItemStory = {
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

export default BudgetItemStory;
