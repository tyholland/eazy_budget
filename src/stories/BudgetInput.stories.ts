import BudgetInput from "../components/BudgetInput/BudgetInput.tsx";

export default {
  title: "Components/BudgetInput",
  component: BudgetInput,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export const Primary = {
  args: {
    inputLabel: "Netflix",
    valuePlaceHolder: "Enter amount",
    labelPlaceHolder: "Enter label",
    defaultValue: 30,
  },
};
