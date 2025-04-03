import BudgetDetails from "../views/BudgetDetails/BudgetDetails.tsx";

const BudgetDetailsStory = {
  title: "Views/BudgetDetails",
  component: BudgetDetails,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export const Primary = {
  args: {
    income: 3000,
    expense: 880,
  },
};

export default BudgetDetailsStory;
