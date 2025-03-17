import SetupBudget from "../views/SetupBudget/SetupBudget.tsx";
import { withRouter } from "storybook-addon-remix-react-router";

export default {
  title: "Views/SetupBudget",
  component: SetupBudget,
  decorators: [withRouter],
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export const Primary = {
  args: { month: "january", year: 2025 },
};
