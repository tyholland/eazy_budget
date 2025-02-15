import React from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
  BarElement,
  LinearScale,
  CategoryScale,
} from "chart.js";
import { Doughnut, Pie, Bar } from "react-chartjs-2";
import * as S from "./graph.style.ts";
import { GraphDataSet, GraphType } from "../../types.ts";

interface GraphProps {
  label: string[];
  dataset: GraphDataSet[];
  title: string;
  type?: GraphType;
}

const Graph = ({ title, label, dataset, type = "doughnut" }: GraphProps) => {
  if (type === "bar") {
    ChartJS.unregister(Legend);
    ChartJS.register(BarElement, LinearScale, CategoryScale, Tooltip, Title);
  } else {
    ChartJS.register(ArcElement, Tooltip, Legend, Title);
  }

  const data = {
    labels: label,
    datasets: dataset,
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: title,
      },
    },
  };

  switch (type) {
    case "doughnut":
      return (
        <S.GraphWraper>
          <Doughnut data={data} options={options} />
        </S.GraphWraper>
      );
    case "pie":
      return (
        <S.GraphWraper>
          <Pie data={data} options={options} />
        </S.GraphWraper>
      );
    case "bar":
      return (
        <S.GraphWraper>
          <Bar data={data} options={options} />
        </S.GraphWraper>
      );
    default:
      return (
        <S.GraphWraper>
          <Doughnut data={data} options={options} />
        </S.GraphWraper>
      );
  }
};

export default Graph;
