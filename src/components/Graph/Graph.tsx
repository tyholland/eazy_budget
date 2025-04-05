import React, { JSX, useEffect, useState } from "react";
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
import {
  budgetOptions,
  budgetViewMatch,
  viewOptions,
} from "../../constants.ts";
import SelectComponent from "../Select/Select.tsx";
import { useNavigate } from "react-router-dom";
import { getDateInfo } from "../../functions/helper.ts";

interface GraphProps {
  label: string[];
  dataset: GraphDataSet[];
  title: string;
  page: string;
}

const Graph = ({ title, label, dataset, page }: GraphProps) => {
  const [selectedView, setSelectedView] = useState<string>(
    viewOptions[0].label,
  );
  const [selectedType, setSelectedType] = useState<string>(title);
  const navigate = useNavigate();
  const { currentMonth, currentYear } = getDateInfo();

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
    maintainAspectRatio: false,
    aspectRatio: 1,
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

  useEffect(() => {
    if (selectedType !== title) {
      const url =
        page === "monthly"
          ? `/monthly/${selectedType}/${currentMonth}/${currentYear}`
          : `/yearly/${selectedType}/${currentYear}`;
      navigate(url);
    }
  }, [selectedType]);

  return (
    <>
      <S.SelectWrapper>
        <SelectComponent
          options={viewOptions}
          placeHolder="Change View"
          defaultValue={viewOptions[0].label}
          setOption={setSelectedView}
        />
        <SelectComponent
          options={budgetOptions}
          placeHolder="Change Budget Type"
          defaultValue={title}
          setOption={setSelectedType}
        />
      </S.SelectWrapper>
      <S.GraphWraper>{chart}</S.GraphWraper>
    </>
  );
};

export default Graph;
