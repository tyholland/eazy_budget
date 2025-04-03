import { fn } from "@storybook/test";
import AccountNav from "../views/AccountNav/AccountNav.tsx";

const AccountNavStory = {
  title: "Views/AccountNav",
  component: AccountNav,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: { setSelectedOption: fn(), logout: fn() },
};

export const Primary = {
  args: {
    selectedOption: "settings",
  },
};

export default AccountNavStory;
