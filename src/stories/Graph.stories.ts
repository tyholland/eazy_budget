import Graph from "../components/Graph/Graph.tsx";
import { graphColors } from "../constants.ts";

export default {
  title: "Components/Graph",
  component: Graph,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export const Primary = {
  args: {
    dataset: [
      {
        label: "Expenses",
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: graphColors,
        borderWidth: 1,
      },
    ],
    label: [
      "Netflix",
      "Hulu",
      "Amazon Prime",
      "YouTube TV",
      "Paramount+",
      "Disney+",
    ],
    title: "Expenses",
  },
};
