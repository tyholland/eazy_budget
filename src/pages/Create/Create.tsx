import React, { useState } from "react";
import * as S from "./create.style.ts";
import { useParams } from "react-router-dom";
import { listOfBudgets, listOfMonths } from "../../constants.ts";
import BudgetItem from "../../views/BudgetItem/BudgetItem.tsx";
import { InputOption } from "../../types.ts";
import Button from "../../components/Button/Button.tsx";

const Create = () => {
  const { type, month, year } = useParams();
  const [arr, setArr] = useState<number[]>([1]);

  if (
    !type ||
    !month ||
    !year ||
    !listOfBudgets.includes(type) ||
    !listOfMonths.includes(month) ||
    isNaN(Number(year))
  ) {
    return <div>Error Page</div>;
  }

  const handleAddNewBudget = () => {
    const newArr: number[] = [];
    newArr.push(arr.length + 1);
    setArr(arr.concat(newArr));
  };

  return (
    <div>
      <S.Title>
        Create {type} for {month} {year}
      </S.Title>

      {arr.map((item) => {
        return (
          <BudgetItem
            key={item}
            theType={type as InputOption}
            editable
            labelPlaceHolder={`${type} name`}
            valuePlaceHolder={`${type} value`}
            inputType="number"
          />
        );
      })}

      <Button
        buttonSize="large"
        handleClick={handleAddNewBudget}
      >{`Add another ${type}`}</Button>
    </div>
  );
};

export default Create;
