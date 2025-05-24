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
import { removeItemFromNumberArray } from "../../functions/helper.ts";
import ErrorPage from "../../views/ErrorPage/ErrorPage.tsx";

const Create = () => {
  const { register, handleSubmit, getValues, unregister, setValue } = useForm();
  const { type, month, year } = useParams();
  const navigate = useNavigate();
  const [hasItems, setHasItems] = useState<boolean>(false);
  const [income, setIncome] = useAtom(incomeAtom);
  const [expense, setExpense] = useAtom(expenseAtom);
  const [budgetArr, setBudgetArr] = useState<number[]>([1]);
  const [budgetFrequency, setBudgetFrequency] = useState<string>("");
  const [budgetCadence, setBudgetCadence] = useState<string>("");

  useEffect(() => {
    if (
      (type === "income" && !!income.length) ||
      (type === "expense" && !!expense.length)
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
    return <ErrorPage />;
  }

  const populatedArray: BudgetDataItem[] = type === "income" ? income : expense;

  const handleAddNewBudget = () => {
    const updatedBudgetArray = addAdditionalBudget(budgetArr);
    setBudgetArr(updatedBudgetArray);
  };

  const handleSubmitBudgetType = (data: Object) => {
    const budgetEntries = formatBudgetItem(data, month, Number(year));
    type === "income" ? setIncome(budgetEntries) : setExpense(budgetEntries);
    navigate("/overview");
  };

  const handleSaveEvent = (item: Object) => {
    setHasItems(!!Object.keys(item).length);
  };

  return (
    <>
      <S.Title>
        Add {type}s for {month} {year}
      </S.Title>
      <S.Wrapper onSubmit={handleSubmit(handleSubmitBudgetType)}>
        {populatedArray.map((item: BudgetDataItem, i: number) => {
          const handleDeleteEvent = () => {
            delete populatedArray[i];
            unregister(Object.keys(getValues())[i]);
            setHasItems(!!Object.keys(getValues()).length);
          };

          return (
            <BudgetItem
              key={i}
              theType={type as InputOption}
              item={item}
              labelPlaceHolder="name"
              valuePlaceHolder="value"
              inputType="number"
              register={register}
              saveEvent={handleSaveEvent}
              deleteEvent={handleDeleteEvent}
              hidePaidContent
              setValue={setValue}
              inputName={`orig-${i}`}
            />
          );
        })}
        {budgetArr.map((item: number, i: number) => {
          const handleAdditionDeleteEvent = () => {
            const newArr = removeItemFromNumberArray(budgetArr, i);
            const budgetValues = Object.keys(getValues());
            unregister(budgetValues[i]);
            setBudgetArr(newArr);

            const hasBudgetItems =
              type === "income" ? !!income.length : !!expense.length;
            setHasItems(!!budgetValues.length || hasBudgetItems);
          };

          return (
            <BudgetItem
              key={item}
              theType={type as InputOption}
              labelPlaceHolder="name"
              valuePlaceHolder="value"
              inputType="number"
              register={register}
              saveEvent={handleSaveEvent}
              deleteEvent={handleAdditionDeleteEvent}
              hidePaidContent
              setValue={setValue}
              inputName={`new-${i}`}
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
              {`Additional ${type}`} <AddIcon />
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
