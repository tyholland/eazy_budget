import Select from "../components/Select/Select.tsx";

export default {
  title: "Components/Select",
  component: Select,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export const Primary = {
  args: {
    options: [
      { id: 1, label: "One" },
      { id: 2, label: "Two" },
    ],
    placeHolder: "Enter label",
    defaultValue: "One",
  },
};
