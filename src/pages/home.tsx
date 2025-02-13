import React from "react";
import Button from "../components/Button/Button.tsx";
import Input from "../components/Input/Input.tsx";

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
      />
      <Button handleClick={handleClick} buttonSize="medium">
        View Message
      </Button>
    </>
  );
};

export default Home;
