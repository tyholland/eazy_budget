import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as S from "./create.style.ts";
import { useNavigate, useParams } from "react-router-dom";
import { listOfBudgets, listOfMonths } from "../../constants.ts";
import BudgetItem from "../../views/BudgetItem/BudgetItem.tsx";
import { BudgetDataItem, InputOption } from "../../types.ts";
import Button from "../../components/Button/Button.tsx";
import AddIcon from "../../svg/AddIcon.tsx";
import SaveIcon from "../../svg/SaveIcon.tsx";
import { useAtom } from "jotai";
import { incomeAtom } from "../../hook/IncomeAtom.ts";
import { expenseAtom } from "../../hook/ExpenseAtom.ts";
import {
  addAdditionalBudget,
  formatBudgetItem,
} from "../../functions/budget.ts";
import DisabledSaveIcon from "../../svg/DisabledSaveIcon.tsx";

const Create = () => {
  const { register, handleSubmit, getValues, unregister } = useForm<any>();
  const { type, month, year } = useParams();
  const navigate = useNavigate();
  const [hasItems, setHasItems] = useState<boolean>(false);
  const [income, setIncome] = useAtom(incomeAtom);
  const [expense, setExpense] = useAtom(expenseAtom);
  const [budgetArr, setBudgetArr] = useState<number[]>([1]);

  useEffect(() => {
    if (
      (type === "income" && income.length > 0) ||
      (type === "expense" && expense.length > 0)
    ) {
      setBudgetArr([]);
      setHasItems(true);
    }
  }, [type]);

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

  const populatedArray: BudgetDataItem[] = type === "income" ? income : expense;

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
      <S.Wrapper name="create" onSubmit={handleSubmit(handleSubmitBudgetType)}>
        {populatedArray.map((item: BudgetDataItem, i: number) => {
          const handleDeleteEvent = () => {
            delete populatedArray[i];
            unregister(Object.keys(getValues())[i]);
            setHasItems(Object.keys(getValues()).length > 0);
          };

          return (
            <BudgetItem
              key={i}
              theType={type as InputOption}
              item={item}
              labelPlaceHolder={`${type} name`}
              valuePlaceHolder={`${type} value`}
              inputType="number"
              register={register}
              saveEvent={handleSaveEvent}
              deleteEvent={handleDeleteEvent}
              hideCheckbox
            />
          );
        })}
        {budgetArr.map((item: number, i: number) => {
          const handleAdditionDeleteEvent = () => {
            const newArr = [...budgetArr];
            newArr.splice(i, 1);
            unregister(Object.keys(getValues())[i]);
            setBudgetArr(newArr);
            setHasItems(Object.keys(getValues()).length > 0);
          };

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
              deleteEvent={handleAdditionDeleteEvent}
              hideCheckbox
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
