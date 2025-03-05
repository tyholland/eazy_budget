import { fn } from "@storybook/test";
import Button from "../components/Button/Button.tsx";

export default {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: { handleClick: fn() },
};

export const Primary = {
  args: {
    buttonSize: "small",
    type: "default",
    children: "Save",
  },
};
