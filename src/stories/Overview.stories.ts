import Overview from "../views/Overview/Overview.tsx";

export default {
  title: "Views/Overview",
  component: Overview,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export const Primary = {
  args: { label: "Yearly", incomeValue: 50, expenseValue: 20 },
};
