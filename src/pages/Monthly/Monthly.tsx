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
  listOfQuarterlyMonths,
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
import DownloadCsv from "../../components/DownloadCsv/DownloadCsv.tsx";
import { trackError, trackEvent } from "../../functions/mixpanel.ts";
import Predict from "../../components/Predict/Predict.tsx";

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
  const isPro = getSubscriptionStatus("Pro", currentUser?.subscription_id);

  useEffect(() => {
    if (budgetChange) {
      setBudget(budget);
      setBudgetChange(false);
    }
  }, [budgetChange]);

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
          {selectedOption !== "goals" && `${month} ${theYear}`} {selectedOption}
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
              {isPro && type === "expense" && (
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
                      .sort((a: BudgetDataItem, b: BudgetDataItem) =>
                        sortBudget(a, b, selectedSort),
                      )
                      .filter((response: BudgetDataItem) =>
                        expenseFilter === 0
                          ? response
                          : response.category_id === expenseFilter,
                      )
                      .map((data: BudgetDataItem, i: number) => {
                        if (
                          data.label === "" &&
                          !data.budget_id &&
                          !data.temp
                        ) {
                          return {};
                        }

                        const currentItems: BudgetDataItem[] = [...item[type]];

                        const handleSaveEvent = async (
                          obj: Object,
                          isPaid?: boolean,
                          frequency?: string,
                          cadence?: string,
                          category_id?: number,
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
                            category_id,
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

                              trackEvent(`Edit ${type}`);
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
                              trackEvent(`Add New ${type}`);
                            }

                            if (
                              updatedItem[0].frequency === "Quarterly" &&
                              !listOfQuarterlyMonths.includes(month)
                            ) {
                              const updatedItems = removeItemFromBudgetArray(
                                item[type],
                                i,
                              );
                              item[type] = updatedItems;
                              setBudgetChange(true);
                            }
                            setIsNewBudget(false);
                          } catch (err) {
                            trackError("Monthly - handleSaveEvent:", {
                              result: err,
                            });
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

                              trackEvent(`Delete ${type}`);
                            }

                            setIsNewBudget(false);
                          } catch (err) {
                            trackError("Monthly - handleDeleteEvent:", {
                              result: err,
                            });
                          }
                        };

                        return (
                          <BudgetItem
                            key={i}
                            theType={type as InputOption}
                            item={data}
                            labelPlaceHolder={`${type.toLowerCase()} name`}
                            valuePlaceHolder={`${type.toLowerCase()} (USD)`}
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
                  title={`Want to remove the last ${type}?`}
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
            {expenseFilter === 0 && (
              <Button
                buttonSize="large"
                handleClick={handleAddNewBudget}
                classType="register"
              >
                <>
                  {`Additional ${type}`} <AddIcon />
                </>
              </Button>
            )}
          </>
        )}
        {selectedOption === "details" && (
          <>
            <BudgetDetails
              income={totalIncome}
              expense={totalExpense}
              month={month}
              year={theYear}
            />
            {isPro && <DownloadCsv type="monthly" />}
          </>
        )}
        {selectedOption === "goals" && <Predict />}
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
