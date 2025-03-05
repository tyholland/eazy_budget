import Overview from "../views/Overview/Overview.tsx";
import { withRouter } from "storybook-addon-remix-react-router";

export default {
  title: "Views/Overview",
  component: Overview,
  decorators: [withRouter],
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export const Primary = {
  args: { label: "Yearly", incomeValue: 50, expenseValue: 20 },
};
