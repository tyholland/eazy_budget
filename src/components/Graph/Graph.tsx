import React, { JSX, useState } from "react";
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
import { budgetViewMatch, viewOptions } from "../../constants.ts";
import SelectComponent from "../Select/Select.tsx";

interface GraphProps {
  label: string[];
  dataset: GraphDataSet[];
  title: string;
}

const Graph = ({ title, label, dataset }: GraphProps) => {
  const [selectedView, setSelectedView] = useState<string>(
    viewOptions[0].label,
  );

  const type = budgetViewMatch.filter((item) => selectedView === item.label)[0]
    ?.type as GraphType;
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
        text: title.toUpperCase(),
      },
    },
  };

  const options2 = {
    ...options,
    plugins: {
      ...options.plugins,
      legend: {
        display: true,
        position: "bottom" as const,
        labels: {
          padding: 30,
        },
      },
    },
  };

  let chart: JSX.Element;

  switch (type) {
    case "doughnut":
      chart = <Doughnut data={data} options={options2} />;
      break;
    case "pie":
      chart = <Pie data={data} options={options2} />;
      break;
    case "bar":
      chart = <Bar data={data} options={options} />;
      break;
    default:
      chart = <Doughnut data={data} options={options} />;
      break;
  }

  return (
    <>
      <S.SelectWrapper>
        <SelectComponent
          options={viewOptions}
          placeHolder="Change View"
          defaultValue={viewOptions[0].label}
          setOption={setSelectedView}
        />
      </S.SelectWrapper>
      <S.GraphWraper>{chart}</S.GraphWraper>
    </>
  );
};

export default Graph;
