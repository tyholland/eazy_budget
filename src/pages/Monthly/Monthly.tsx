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
import {
  addNewBudgetItem,
  getMonthlyBudgetBreakdown,
  getMonthlyTotalAmount,
  reformatBudgetItem,
} from "../../functions/budget.ts";
import Button from "../../components/Button/Button.tsx";
import AddIcon from "../../svg/AddIcon.tsx";
import ModalComponent from "../../components/Modal/Modal.tsx";
import { removeItemFromBudgetArray } from "../../functions/helper.ts";
import ErrorPage from "../../views/ErrorPage/ErrorPage.tsx";
import {
  addBudgetItem,
  deleteBudgetItem,
  updateBudgetItem,
} from "../../requests/budget.ts";
import { useAuth0 } from "@auth0/auth0-react";
import BudgetInput from "../../components/BudgetInput/BudgetInput.tsx";
import Carousel from "../../components/Carousel/Carousel.tsx";

const Monthly = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [budget, setBudget] = useAtom(budgetAtom);
  const clonedBudget = [...budget];
  const navigate = useNavigate();
  const { type, month, year } = useParams();
  const [selectedView, setSelectedView] = useState<string>(
    viewOptions[0].label,
  );
  const [selectedType, setSelectedType] = useState<string | undefined>(type);
  const [budgetChange, setBudgetChange] = useState<boolean>(false);
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

  const theYear = Number(year);

  const totalIncome = getMonthlyTotalAmount(budget, month, theYear, "income");
  const totalExpense = getMonthlyTotalAmount(budget, month, theYear, "expense");
  const cashFlow = totalIncome - totalExpense;
  const expenseToIncome = ((totalExpense / totalIncome) * 100).toFixed(2);
  const { data, labels } = getMonthlyBudgetBreakdown(
    budget,
    month,
    type,
    theYear,
  );

  const handleAddNewBudget = () => {
    const updatedBudget = addNewBudgetItem(clonedBudget, month, theYear, type);

    setBudget(updatedBudget);
  };

  return (
    <S.MonthlyWrapper>
      <S.Title>
        {month} {theYear} {type}
      </S.Title>
      <Carousel>
        <>
          <S.TotalBudgetWrapper className="emblaSlide">
            <BudgetInput
              inputLabel="Expense to Income Ratio"
              defaultValue={expenseToIncome}
              type="number"
              percent
            />
          </S.TotalBudgetWrapper>
          <S.TotalBudgetWrapper className="emblaSlide">
            <BudgetInput
              inputLabel={`Total ${month} income`}
              defaultValue={totalIncome}
              type="number"
              inputOption="income"
            />
          </S.TotalBudgetWrapper>
          <S.TotalBudgetWrapper className="emblaSlide">
            <BudgetInput
              inputLabel={`Total ${month} expenses`}
              defaultValue={totalExpense}
              type="number"
              inputOption="expense"
            />
          </S.TotalBudgetWrapper>
          <S.TotalBudgetWrapper className="emblaSlide">
            <BudgetInput
              inputLabel={`Total ${month} remaining cash`}
              defaultValue={cashFlow}
              type="number"
            />
          </S.TotalBudgetWrapper>
        </>
      </Carousel>
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
        <>
          <S.ItemWrapper>
            {!budget.length && <div>Loading...</div>}
            {budget.map((item: BudgetData) => {
              if (month === item.month.toLowerCase() && theYear === item.year) {
                return item[type].map((data: BudgetDataItem, i: number) => {
                  const currentItems: BudgetDataItem[] = [...item[type]];

                  const handleSaveEvent = async (
                    obj: Object,
                    isPaid?: boolean,
                  ) => {
                    const updatedItem = reformatBudgetItem(
                      obj,
                      data.budget_id,
                      data.budget_date_id,
                      isPaid,
                    );

                    currentItems[i] = updatedItem[0];
                    item[type] = currentItems;
                    setBudgetChange(true);

                    try {
                      const accessToken = await getAccessTokenSilently({
                        authorizationParams: {
                          audience: process.env.REACT_APP_AUDIENCE,
                          scope: "read:user",
                        },
                      });

                      if (!!data.budget_id) {
                        await updateBudgetItem(accessToken, updatedItem[0]);
                      } else {
                        updatedItem[0].type = type;
                        const updatedBudgetItem = await addBudgetItem(
                          accessToken,
                          updatedItem[0],
                        );

                        updatedItem[0].budget_id = updatedBudgetItem.budget_id;
                        delete updatedItem[0].type;
                      }
                    } catch (err) {
                      console.error(err);
                    }
                  };

                  const handleDeleteEvent = async () => {
                    if (currentItems.length === 1) {
                      setIsOpen(true);
                      return;
                    }

                    const updatedItems = removeItemFromBudgetArray(
                      currentItems,
                      i,
                    );
                    item[type] = updatedItems;
                    setBudgetChange(true);

                    try {
                      const accessToken = await getAccessTokenSilently({
                        authorizationParams: {
                          audience: process.env.REACT_APP_AUDIENCE,
                          scope: "read:user",
                        },
                      });

                      if (!!data.budget_id) {
                        await deleteBudgetItem(accessToken, data.budget_id);
                      }
                    } catch (err) {
                      console.error(err);
                    }
                  };

                  return (
                    <BudgetItem
                      key={i}
                      theType={type as InputOption}
                      item={data}
                      labelPlaceHolder="name"
                      valuePlaceHolder="value"
                      inputType="number"
                      saveEvent={handleSaveEvent}
                      deleteEvent={handleDeleteEvent}
                      hideCheckbox={type === "income"}
                      editable={data.label === ""}
                    />
                  );
                });
              }
              return null;
            })}
            <ModalComponent
              isOpen={isOpen}
              title={`Want to remove the last ${type}???`}
              handleClose={() => setIsOpen(false)}
            >
              <S.ModalWrapper>
                <span>
                  You can't delete this {type} because it is the only one you
                  have left. Please edit it instead.
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
          <Button
            buttonSize="large"
            handleClick={handleAddNewBudget}
            classType="register"
          >
            <>
              {`Additional ${type}`} <AddIcon />
            </>
          </Button>
        </>
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
    </S.MonthlyWrapper>
  );
};

export default Monthly;
