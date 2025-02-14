import React from "react";
import Button from "../components/Button/Button.tsx";
import Input from "../components/Input/Input.tsx";
import AutoComplete from "../components/AutoComplete/AutoComplete.tsx";

const Home = () => {
  const handleClick = () => {
    console.log("hi there");
  };

  return (
    <>
      <Input
        inputLabel="Netflix"
        inputOption="expense"
        disabled
        type="number"
        placeHolder="Enter Amount"
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
    </>
  );
};

export default Home;
