import AutoComplete from "../components/AutoComplete/AutoComplete.tsx";

export default {
  title: "Components/AutoComplete",
  component: AutoComplete,
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
  },
};
