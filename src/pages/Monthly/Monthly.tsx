import React, { useEffect, useState } from "react";
import {
  BudgetData,
  BudgetDataItem,
  GraphType,
  InputOption,
} from "../../types.ts";
import { useParams, useNavigate } from "react-router-dom";
import { budgetAtom } from "../../hook/BudgetAtom.ts";
import { useAtom } from "jotai";
import * as S from "./monthly.style.ts";
import BudgetItem from "../../views/BudgetItem/BudgetItem.tsx";
import Select from "../../components/Select/Select.tsx";
import Graph from "../../components/Graph/Graph.tsx";
import {
  budgetOptions,
  budgetViewMatch,
  graphColors,
  listOfBudgets,
  listOfMonths,
  viewOptions,
} from "../../constants.ts";
import Overview from "../../views/Overview/Overview.tsx";
import {
  addAdditionalBudget,
  getMonthlyBudgetBreakdown,
  getMonthlyTotalAmount,
  reformatBudgetItem,
} from "../../functions/budget.ts";
import Button from "../../components/Button/Button.tsx";
import AddIcon from "../../svg/AddIcon.tsx";
import ModalComponent from "../../components/Modal/Modal.tsx";

const Monthly = () => {
  const [budget, setBudget] = useAtom(budgetAtom);
  const navigate = useNavigate();
  const { type, month, year } = useParams();
  const [selectedView, setSelectedView] = useState<string>(
    viewOptions[0].label,
  );
  const [selectedType, setSelectedType] = useState<string | undefined>(type);
  const [budgetChange, setBudgetChange] = useState<boolean>(false);
  const [budgetArr, setBudgetArr] = useState<number[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    if (selectedType !== type) {
      navigate(`/monthly/${selectedType?.toLowerCase()}/${month}/${theYear}`);
    }
  }, [selectedType]);

  useEffect(() => {
    if (budgetChange) {
      setBudget(budget);
      setBudgetChange(false);
    }
  }, [budgetChange]);

  if (!budget.length) {
    navigate("/");
  }

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

  const theYear = Number(year);

  const totalIncome = getMonthlyTotalAmount(budget, month, theYear, "income");
  const totalExpense = getMonthlyTotalAmount(budget, month, theYear, "expense");
  const { data, labels } = getMonthlyBudgetBreakdown(
    budget,
    month,
    type,
    theYear,
  );

  const handleAddNewBudget = () => {
    const updatedBudgetArray = addAdditionalBudget(budgetArr);
    setBudgetArr(updatedBudgetArray);
  };

  return (
    <S.MonthlyWrapper>
      <S.Title>
        {month} {theYear} {type}
      </S.Title>
      <S.SelectWrapper>
        <Select
          options={budgetOptions}
          placeHolder="Change Budget Type"
          defaultValue={type}
          setOption={setSelectedType}
        />
        <Select
          options={viewOptions}
          placeHolder="Change View"
          defaultValue={viewOptions[0].label}
          setOption={setSelectedView}
        />
      </S.SelectWrapper>
      {selectedView === "Text" && (
        <S.ItemWrapper>
          {budget?.map((item: BudgetData) => {
            if (month === item.month.toLowerCase() && theYear === item.year) {
              return item[type].map((data: BudgetDataItem, i: number) => {
                const currentItems: BudgetDataItem[] = [...item[type]];

                const handleSaveEvent = (obj: Object, isPaid?: boolean) => {
                  const updatedItem = reformatBudgetItem(obj, isPaid);
                  currentItems[i] = updatedItem[0];
                  item[type] = currentItems;
                  setBudgetChange(true);
                };

                const handleDeleteEvent = () => {
                  if (currentItems.length === 1) {
                    setIsOpen(true);
                    return;
                  }

                  delete currentItems[i];
                  item[type] = currentItems;
                  setBudgetChange(true);
                };

                return (
                  <BudgetItem
                    key={i}
                    theType={type as InputOption}
                    item={data}
                    labelPlaceHolder={`${type} name`}
                    valuePlaceHolder={`${type} value`}
                    inputType="number"
                    saveEvent={handleSaveEvent}
                    deleteEvent={handleDeleteEvent}
                    hideCheckbox={type === "income"}
                  />
                );
              });
            }
            return null;
          })}

          {budgetArr.map((item: number, i: number) => {
            const specificBudget = budget.filter(
              (item: BudgetData) =>
                month === item.month.toLowerCase() && theYear === item.year,
            )[0];

            const handleAdditionSaveEvent = (obj: Object, isPaid?: boolean) => {
              const updatedItem = reformatBudgetItem(obj, isPaid);
              specificBudget[type].push(updatedItem[0]);
              setBudgetArr([]);
              setBudgetChange(true);
            };

            const handleAdditionDeleteEvent = () => {
              const newArr = [...budgetArr];
              delete newArr[i];
              setBudgetArr(newArr);
              setBudgetChange(true);
            };

            return (
              <BudgetItem
                key={item}
                editable
                theType={type as InputOption}
                labelPlaceHolder={`${type} name`}
                valuePlaceHolder={`${type} value`}
                inputType="number"
                saveEvent={handleAdditionSaveEvent}
                deleteEvent={handleAdditionDeleteEvent}
                hideCheckbox={type === "income"}
              />
            );
          })}
          <Button
            buttonSize="large"
            handleClick={handleAddNewBudget}
            classType="register"
          >
            <>
              {`Add another ${type}`} <AddIcon />
            </>
          </Button>
          <ModalComponent
            isOpen={isOpen}
            title={`Want to remove the last ${type}???`}
            handleClose={() => setIsOpen(false)}
          >
            <S.ModalWrapper>
              <span>
                You can't delete this {type} because it is the only one you have
                left. Please edit it instead.
              </span>
              <Button
                buttonSize="small"
                handleClick={() => setIsOpen(false)}
                classType="exit"
              >
                Close
              </Button>
            </S.ModalWrapper>
          </ModalComponent>
        </S.ItemWrapper>
      )}
      {selectedView !== "Text" && (
        <Graph
          type={
            budgetViewMatch.filter((item) => selectedView === item.label)[0]
              ?.type as GraphType
          }
          dataset={[
            {
              backgroundColor: graphColors,
              borderWidth: 1,
              data: data,
            },
          ]}
          label={labels}
          title={type}
        />
      )}
      <S.TotalBudgetWrapper>
        <Overview
          showLabel={false}
          incomeValue={totalIncome}
          expenseValue={totalExpense}
          hideViewIcon
        />
      </S.TotalBudgetWrapper>
    </S.MonthlyWrapper>
  );
};

export default Monthly;
