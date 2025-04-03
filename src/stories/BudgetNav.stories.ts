import { fn } from "@storybook/test";
import BudgetNav from "../views/BudgetNav/BudgetNav.tsx";

const BudgetNavStory = {
  title: "Views/BudgetNav",
  component: BudgetNav,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: { setSelectedOption: fn(), setSelectedType: fn() },
};

export const Primary = {
  args: {
    selectedOption: "income",
  },
};

export default BudgetNavStory;
