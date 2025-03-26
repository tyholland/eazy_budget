import { fn } from "@storybook/test";
import Input from "../components/Input/Input.tsx";

const InputStory = {
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
    labelValue: "Label",
    placeHolder: "Enter amount",
  },
};

export default InputStory;
