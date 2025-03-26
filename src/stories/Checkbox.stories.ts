import { fn } from "@storybook/test";
import Checkbox from "../components/Checkbox/Checkbox.tsx";

const CheckboxStory = {
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

export default CheckboxStory;
