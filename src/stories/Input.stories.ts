import Input from "../components/Input/Input.tsx";

export default {
  title: "Components/Input",
  component: Input,
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
  },
};
