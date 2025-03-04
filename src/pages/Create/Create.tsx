import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as S from "./create.style.ts";
import { useParams } from "react-router-dom";
import { listOfBudgets, listOfMonths } from "../../constants.ts";
import BudgetItem from "../../views/BudgetItem/BudgetItem.tsx";
import { BudgetDataItem, InputOption } from "../../types.ts";
import Button from "../../components/Button/Button.tsx";
import AddIcon from "../../svg/AddIcon.tsx";
import SaveIcon from "../../svg/SaveIcon.tsx";
import { useSetAtom } from "jotai";
import { incomeAtom } from "../../hook/IncomeAtom.ts";
import { expenseAtom } from "../../hook/ExpenseAtom.ts";

const Create = () => {
  const { register, handleSubmit } = useForm<any>();
  const { type, month, year } = useParams();
  const [arr, setArr] = useState<number[]>([1]);
  const setIncome = useSetAtom(incomeAtom);
  const setExpense = useSetAtom(expenseAtom);

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

  const handleSubmitBudgetType = (data: any) => {
    const budgetEntries: BudgetDataItem[] = [];

    Object.entries(data).forEach((item) => {
      const val = item[1] as string;

      budgetEntries.push({
        label: item[0],
        value: Number(val.replace("$", "")),
        paid: false,
      });
    });

    if (type === "income") {
      setIncome(budgetEntries);
      return;
    }

    setExpense(budgetEntries);
  };

  return (
    <>
      <S.Title>
        Create {type} for {month} {year}
      </S.Title>
      <S.Wrapper onSubmit={handleSubmit(handleSubmitBudgetType)}>
        {arr.map((item) => {
          return (
            <BudgetItem
              key={item}
              theType={type as InputOption}
              editable
              labelPlaceHolder={`${type} name`}
              valuePlaceHolder={`${type} value`}
              inputType="number"
              register={register}
            />
          );
        })}

        <S.BtnWrapper>
          <Button
            buttonSize="large"
            handleClick={handleAddNewBudget}
            classType="register"
          >
            <>
              {`Add another ${type}`} <AddIcon />
            </>
          </Button>
          <Button type="submit" buttonSize="large">
            <>
              {`Submit ${type}`} <SaveIcon />
            </>
          </Button>
        </S.BtnWrapper>
      </S.Wrapper>
    </>
  );
};

export default Create;
