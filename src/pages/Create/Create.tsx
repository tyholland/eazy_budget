import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as S from "./create.style.ts";
import { useNavigate, useParams } from "react-router-dom";
import { listOfBudgets, listOfMonths } from "../../constants.ts";
import BudgetItem from "../../views/BudgetItem/BudgetItem.tsx";
import { InputOption } from "../../types.ts";
import Button from "../../components/Button/Button.tsx";
import AddIcon from "../../svg/AddIcon.tsx";
import SaveIcon from "../../svg/SaveIcon.tsx";
import { useSetAtom } from "jotai";
import { incomeAtom } from "../../hook/IncomeAtom.ts";
import { expenseAtom } from "../../hook/ExpenseAtom.ts";
import {
  addAdditionalBudget,
  formatBudgetItem,
} from "../../functions/budget.ts";
import DisabledSaveIcon from "../../svg/DisabledSaveIcon.tsx";

const Create = () => {
  const { register, handleSubmit } = useForm<any>();
  const { type, month, year } = useParams();
  const navigate = useNavigate();
  const [budgetArr, setBudgetArr] = useState<number[]>([1]);
  const [hasItems, setHasItems] = useState<boolean>(false);
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
    const updatedBudgetArray = addAdditionalBudget(budgetArr);
    setBudgetArr(updatedBudgetArray);
  };

  const handleSubmitBudgetType = (data: Object) => {
    const budgetEntries = formatBudgetItem(data);

    if (type === "income") {
      setIncome(budgetEntries);
      navigate("/");
      return;
    }

    setExpense(budgetEntries);
    navigate("/");
  };

  const handleSaveEvent = (item: Object) => {
    setHasItems(Object.keys(item).length > 0);
  };

  return (
    <>
      <S.Title>
        Create {type} for {month} {year}
      </S.Title>
      <S.Wrapper onSubmit={handleSubmit(handleSubmitBudgetType)}>
        {budgetArr.map((item) => {
          return (
            <BudgetItem
              key={item}
              theType={type as InputOption}
              editable
              labelPlaceHolder={`${type} name`}
              valuePlaceHolder={`${type} value`}
              inputType="number"
              register={register}
              saveEvent={handleSaveEvent}
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
          <Button type="submit" buttonSize="large" disabled={!hasItems}>
            <>
              {`Submit ${type}`}{" "}
              {hasItems ? <SaveIcon /> : <DisabledSaveIcon />}
            </>
          </Button>
        </S.BtnWrapper>
      </S.Wrapper>
    </>
  );
};

export default Create;
