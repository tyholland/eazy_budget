import { fn } from "@storybook/test";
import Input from "../components/Input/Input.tsx";

export default {
  title: "Components/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: { onChange: fn() },
};

export const Primary = {
  args: {
    label: "Netflix",
    labelValue: "Enter amount",
    placeHolder: "Enter label",
  },
};
