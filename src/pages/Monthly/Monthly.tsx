import React, { useEffect, useState } from "react";
import {
  BudgetData,
  BudgetDataItem,
  InputOption,
  NewBudgetIds,
} from "../../types.ts";
import { useParams } from "react-router-dom";
import { budgetAtom } from "../../hook/BudgetAtom.ts";
import { useAtom, useAtomValue } from "jotai";
import * as S from "./monthly.style.ts";
import BudgetItem from "../../views/BudgetItem/BudgetItem.tsx";
import Graph from "../../components/Graph/Graph.tsx";
import {
  budgetSortOptions,
  graphColors,
  listOfBudgets,
  listOfMonths,
} from "../../constants.ts";
import {
  addNewBudgetItem,
  getMonthlyBudgetBreakdown,
  getMonthlyTotalAmount,
  insertBasedOnCadence,
  insertBudgetIds,
  reformatBudgetItem,
  sortBudget,
  updateBasedOnCadence,
} from "../../functions/budget.ts";
import Button from "../../components/Button/Button.tsx";
import AddIcon from "../../svg/AddIcon.tsx";
import ModalComponent from "../../components/Modal/Modal.tsx";
import {
  getSubscriptionStatus,
  removeItemFromBudgetArray,
} from "../../functions/helper.ts";
import ErrorPage from "../../views/ErrorPage/ErrorPage.tsx";
import {
  addBudgetItem,
  deleteBudgetItem,
  updateBudgetItem,
} from "../../requests/budget.ts";
import { useAuth0 } from "@auth0/auth0-react";
import BudgetDetails from "../../views/BudgetDetails/BudgetDetails.tsx";
import BudgetNav from "../../views/BudgetNav/BudgetNav.tsx";
import Loading from "../../components/Loading/Loading.tsx";
import SelectComponent from "../../components/Select/Select.tsx";
import { userAtom } from "../../hook/UserAtom.ts";
import { DARKER_GRAY } from "../../index.style.ts";

const Monthly = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [budget, setBudget] = useAtom(budgetAtom);
  const currentUser = useAtomValue(userAtom);
  const clonedBudget = [...budget];
  const { type, month, year } = useParams();
  const [selectedOption, setSelectedOption] = useState<string | undefined>(
    type,
  );
  const [budgetChange, setBudgetChange] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isNewBudget, setIsNewBudget] = useState<boolean>(false);
  const [selectedSort, setSelectedSort] = useState<string>("A - Z");
  const [selectedFilter, setSelectedFilter] = useState<string>("None");
  const [expenseFilter, setExpenseFilter] = useState<number | undefined>(0);

  const sortBudgetItems = (type: string) => {
    const updatedBudget: BudgetData[] = [...budget];

    updatedBudget.forEach((item: BudgetData) => {
      item[type].sort((a: BudgetDataItem, b: BudgetDataItem) =>
        sortBudget(a, b, selectedSort),
      );
    });

    setBudget(updatedBudget);
  };

  useEffect(() => {
    if (budgetChange) {
      setBudget(budget);
      setBudgetChange(false);
    }
  }, [budgetChange]);

  useEffect(() => {
    type && sortBudgetItems(type);
  }, [selectedSort, type]);

  useEffect(() => {
    const filter = currentUser?.categories.filter(
      (item) => item.label === selectedFilter,
    )[0];
    type === "income" ? setExpenseFilter(0) : setExpenseFilter(filter?.id || 0);
  }, [selectedFilter, type]);

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
  const { data, labels } = getMonthlyBudgetBreakdown(
    budget,
    month,
    type,
    theYear,
  );

  const handleAddNewBudget = () => {
    const updatedBudget = addNewBudgetItem(clonedBudget, month, theYear, type);

    setBudget(updatedBudget);
    setIsNewBudget(true);
  };

  return (
    <S.MonthlyWrapper>
      <BudgetNav
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
        incomeUrl={`/monthly/income/${month}/${theYear}`}
        expenseUrl={`/monthly/expense/${month}/${theYear}`}
      />
      <S.ContentWrapper>
        <S.Title>
          {month} {theYear} {type}
        </S.Title>
        {selectedOption === type && (
          <>
            <S.Selectors>
              {getSubscriptionStatus(
                "Starter",
                currentUser?.subscription_id,
              ) && (
                <SelectComponent
                  options={budgetSortOptions}
                  placeHolder="Sort Items"
                  defaultValue={budgetSortOptions[0].label}
                  setOption={setSelectedSort}
                />
              )}
              {getSubscriptionStatus("Pro", currentUser?.subscription_id) &&
                type === "expense" && (
                  <SelectComponent
                    options={
                      currentUser?.categories.concat({
                        id: 0,
                        label: "None",
                      }) || []
                    }
                    placeHolder="Filter by Category"
                    defaultValue={selectedFilter}
                    setOption={setSelectedFilter}
                  />
                )}
            </S.Selectors>
            <S.ItemWrapper>
              <S.ItemContainer>
                {!budget.length && <Loading />}
                {budget.map((item: BudgetData) => {
                  if (
                    month === item.month.toLowerCase() &&
                    theYear === item.year
                  ) {
                    return item[type]
                      .filter((response: BudgetDataItem) =>
                        expenseFilter === 0
                          ? response
                          : response.category_id === expenseFilter,
                      )
                      .map((data: BudgetDataItem, i: number) => {
                        const currentItems: BudgetDataItem[] = [...item[type]];

                        const handleSaveEvent = async (
                          obj: Object,
                          isPaid?: boolean,
                          frequency?: string,
                          cadence?: string,
                          category?: string,
                        ) => {
                          const updatedItem = reformatBudgetItem(
                            obj,
                            data.budget_id,
                            data.budget_date_id,
                            month,
                            theYear,
                            isPaid,
                            frequency,
                            cadence,
                            category,
                          );

                          try {
                            const accessToken = await getAccessTokenSilently({
                              authorizationParams: {
                                audience: process.env.REACT_APP_AUDIENCE,
                                scope: "read:user",
                              },
                            });

                            if (!!data.budget_id) {
                              updateBasedOnCadence(
                                item,
                                updatedItem[0],
                                budget,
                                data,
                                month,
                                theYear,
                                type,
                              );
                              setBudgetChange(true);

                              await updateBudgetItem(
                                accessToken,
                                updatedItem[0],
                              );
                            } else {
                              insertBasedOnCadence(
                                item,
                                updatedItem[0],
                                budget,
                                month,
                                theYear,
                                type,
                              );
                              setBudgetChange(true);

                              updatedItem[0].type = type;
                              const updatedBudgetItem: NewBudgetIds =
                                await addBudgetItem(
                                  accessToken,
                                  updatedItem[0],
                                );

                              insertBudgetIds(
                                item,
                                updatedItem[0],
                                budget,
                                month,
                                theYear,
                                type,
                                updatedBudgetItem,
                              );
                              setBudgetChange(true);
                            }
                            setIsNewBudget(false);
                          } catch (err) {
                            console.error("Monthly - handleSaveEvent:", err);
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
                              await deleteBudgetItem(
                                accessToken,
                                data.budget_id,
                              );
                            }

                            setIsNewBudget(false);
                          } catch (err) {
                            console.error("Monthly - handleDeleteEvent:", err);
                          }
                        };

                        return (
                          <BudgetItem
                            key={i}
                            theType={type as InputOption}
                            item={data}
                            labelPlaceHolder={`${type.toLowerCase()} name`}
                            valuePlaceHolder={`${type.toLowerCase()} amount`}
                            inputType="number"
                            saveEvent={handleSaveEvent}
                            deleteEvent={handleDeleteEvent}
                            hidePaidContent={type === "income"}
                            openModal={isNewBudget}
                          />
                        );
                      });
                  }
                  return null;
                })}
                <ModalComponent
                  isOpen={isOpen}
                  title={`Want to remove the last ${type}???`}
                >
                  <S.ModalWrapper>
                    <span>
                      You can't delete this {type} because it is the only one
                      you have left. Please edit it instead.
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
              </S.ItemContainer>
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
        {selectedOption === "details" && (
          <BudgetDetails
            income={totalIncome}
            expense={totalExpense}
            month={month}
            year={theYear}
          />
        )}
        {selectedOption === "charts" && (
          <Graph
            dataset={[
              {
                backgroundColor: graphColors,
                borderWidth: 1,
                data: data,
                borderColor: DARKER_GRAY,
              },
            ]}
            label={labels}
            title={type}
            page="monthly"
          />
        )}
      </S.ContentWrapper>
    </S.MonthlyWrapper>
  );
};

export default Monthly;
