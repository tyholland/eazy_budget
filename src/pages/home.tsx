import React from "react";
import Button from "../components/Button/Button.tsx";
import Input from "../components/Input/Input.tsx";
import AutoComplete from "../components/AutoComplete/AutoComplete.tsx";
import Graph from "../components/Graph/Graph.tsx";
import { GraphDataSet } from "../types.ts";
import { graphColors } from "../constants.ts";

const Home = () => {
  const handleClick = () => {
    console.log("hi there");
  };

  const dataset: GraphDataSet[] = [
    {
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: graphColors,
      borderWidth: 1,
    },
  ];

  const label = [
    "Netflix",
    "Hulu",
    "Amazon Prime",
    "YouTube TV",
    "Paramount+",
    "Disney+",
  ];

  return (
    <>
      <Input
        inputLabel="Netflix"
        inputOption="expense"
        editableValue
        type="number"
        valuePlaceHolder="Enter Amount"
        labelPlaceHolder="Enter Label"
        defaultValue={30}
      />
      <Button handleClick={handleClick} buttonSize="medium">
        View Message
      </Button>
      <AutoComplete
        placeHolder="Expense Label"
        options={[
          { id: 1, label: "Netflix" },
          { id: 2, label: "Hulu" },
        ]}
      />
      <Graph dataset={dataset} label={label} title="Expenses" type="bar" />
    </>
  );
};

export default Home;
