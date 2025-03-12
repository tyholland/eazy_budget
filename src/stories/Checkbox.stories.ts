import { fn } from "@storybook/test";
import Checkbox from "../components/Checkbox/Checkbox.tsx";

export default {
  title: "Components/Checkbox",
  component: Checkbox,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: { setCheckedVal: fn() },
};

export const Primary = {
  args: {
    label: "Paid",
    isDisabled: false,
    isChecked: true,
  },
};
