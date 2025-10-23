import React, { useEffect, useState } from "react";
import {
  BudgetData,
  BudgetDataItem,
  InputOption,
  NewBudgetIds,
} from "../../types.ts";
import { useParams } from "react-router-dom";
import { budgetAtom } from "../../hook/BudgetAtom.ts";
import { useAtom } from "jotai";
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
  checkIsExpiredSession,
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
import SessionExpired from "../../components/SessionExpired/SessionExpired.tsx";

const Monthly = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [budget, setBudget] = useAtom(budgetAtom);
  const [currentUser, setCurrentUser] = useAtom(userAtom);
  const clonedBudget = [...budget];
  const { type, month, year } = useParams();
  const [selectedOption, setSelectedOption] = useState<string | undefined>(
    type,
  );
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isNewBudget, setIsNewBudget] = useState<boolean>(false);
  const [selectedSort, setSelectedSort] = useState<string>(
    currentUser?.selectedSort || budgetSortOptions[0].label,
  );
  const [selectedFilter, setSelectedFilter] = useState<string>(
    currentUser?.selectedCategory || "None",
  );
  const filter = currentUser?.categories.filter(
    (item) => item.label === currentUser.selectedCategory,
  )[0];
  const [expenseFilter, setExpenseFilter] = useState<number | undefined>(
    filter?.id || 0,
  );
  const isPro = getSubscriptionStatus("Pro", currentUser?.subscription_id);
  const [isSessionExpired, setIsSessionExpired] = useState<boolean>(false);

  useEffect(() => {
    if (type === "income") {
      setExpenseFilter(0);
      setSelectedFilter("None");
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

  const theYear = Number(year);

  const totalIncome = getMonthlyTotalAmount(budget, month, theYear, "income");
  const totalExpense = getMonthlyTotalAmount(budget, month, theYear, "expense");
  const { data, labels } = getMonthlyBudgetBreakdown(
    budget,
    month,
    type,
    theYear,
  );
  const budgetIndex = clonedBudget.findIndex(
    (item) => item.year === theYear && item.month === month,
  );

  const handleAddNewBudget = () => {
    const updatedBudget = addNewBudgetItem(clonedBudget, month, theYear, type);

    setBudget(updatedBudget);
    setIsNewBudget(true);
  };

  const handleSaveEvent = async (
    obj: Object,
    data?: BudgetDataItem,
    isPaid?: boolean,
    frequency?: string,
    cadence?: string,
    category_id?: number,
    item?: BudgetData,
    i?: number,
  ) => {
    const updatedItem = reformatBudgetItem(
      obj,
      data?.budget_id || null,
      data?.budget_date_id || null,
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

      if (!!data?.budget_id) {
        const updatedBudgets = updateBasedOnCadence(
          item as BudgetData,
          updatedItem[0],
          budget,
          data,
          month,
          theYear,
          type,
        );

        if (updatedItem[0].cadence === "Future Months" && !!updatedBudgets) {
          const tempBudget = [...budget];

          for (let i = budgetIndex; i <= 11; i++) {
            const count = i - budgetIndex;

            tempBudget[i][type] = updatedBudgets[count];
          }

          setBudget(tempBudget);
        }

        if (updatedItem[0].cadence === "All Months" && !!updatedBudgets) {
          const tempBudget = [...budget];

          if (updatedItem[0].frequency === "Quarterly") {
            for (let i = 0; i <= 11; i++) {
              if (i === 2 || i === 5 || i === 8 || i === 11) {
                tempBudget[i][type] = updatedBudgets[i];
              }
            }

            setBudget(tempBudget);
          } else {
            for (let i = 0; i <= 11; i++) {
              tempBudget[i][type] = updatedBudgets[i];
            }

            setBudget(tempBudget);
          }
        }

        if (updatedItem[0].cadence === "Current Month") {
          const tempBudget = [...budget];
          tempBudget[budgetIndex][type] = updatedBudgets;
          setBudget(tempBudget);
        }

        await updateBudgetItem(accessToken, updatedItem[0]);

        trackEvent(`Edit ${type}`);
      } else {
        insertBasedOnCadence(
          item as BudgetData,
          updatedItem[0],
          budget,
          month,
          theYear,
          type,
        );

        updatedItem[0].type = type;
        const updatedBudgetItem: NewBudgetIds = await addBudgetItem(
          accessToken,
          updatedItem[0],
        );

        const insertedBudgets = insertBudgetIds(
          item as BudgetData,
          updatedItem[0],
          budget,
          month,
          theYear,
          type,
          updatedBudgetItem,
        );

        if (updatedItem[0].cadence === "Future Months" && !!insertedBudgets) {
          const tempBudget = [...budget];

          for (let i = budgetIndex; i <= 11; i++) {
            const count = i - budgetIndex;

            tempBudget[i][type] = insertedBudgets[count];
          }

          setBudget(tempBudget);
        }

        if (updatedItem[0].cadence === "All Months" && !!insertedBudgets) {
          const tempBudget = [...budget];

          if (updatedItem[0].frequency === "Quarterly") {
            for (let i = 0; i <= 11; i++) {
              if (i === 2 || i === 5 || i === 8 || i === 11) {
                tempBudget[i][type] = insertedBudgets[i];
              }
            }

            setBudget(tempBudget);
          } else {
            for (let i = 0; i <= 11; i++) {
              tempBudget[i][type] = insertedBudgets[i];
            }

            setBudget(tempBudget);
          }
        }

        if (updatedItem[0].cadence === "Current Month") {
          const tempBudget = [...budget];
          tempBudget[budgetIndex][type] = insertedBudgets;
          setBudget(tempBudget);
        }

        trackEvent(`Add New ${type}`);
      }

      if (
        updatedItem[0].frequency === "Quarterly" &&
        !listOfQuarterlyMonths.includes(month) &&
        item &&
        i
      ) {
        const updatedItems = removeItemFromBudgetArray(item[type], i);
        const tempBudget = [...budget];
        tempBudget[budgetIndex][type] = updatedItems;

        setBudget(tempBudget);
      }

      setIsNewBudget(false);
    } catch (err) {
      trackError("Monthly - handleSaveEvent:", {
        result: err,
      });

      if (checkIsExpiredSession(err)) {
        setIsSessionExpired(true);
      }
    }
  };

  const handleDeleteEvent = async (
    currentItems: BudgetDataItem[],
    data: BudgetDataItem,
  ) => {
    if (currentItems.length === 1) {
      setIsOpen(true);
      return;
    }

    const updatedItems = removeItemFromBudgetArray(
      currentItems,
      data.budget_id,
    );

    const tempBudget = [...budget];
    tempBudget[budgetIndex][type] = updatedItems;
    setBudget(tempBudget);

    try {
      const accessToken = await getAccessTokenSilently({
        authorizationParams: {
          audience: process.env.REACT_APP_AUDIENCE,
          scope: "read:user",
        },
      });

      if (!!data.budget_id) {
        await deleteBudgetItem(accessToken, data.budget_id);

        trackEvent(`Delete ${type}`);
      }

      setIsNewBudget(false);
    } catch (err) {
      trackError("Monthly - handleDeleteEvent:", {
        result: err,
      });

      if (checkIsExpiredSession(err)) {
        setIsSessionExpired(true);
      }
    }
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
                  defaultValue={currentUser?.selectedSort || selectedSort}
                  setOption={(val) => {
                    setSelectedSort(val);

                    currentUser &&
                      setCurrentUser({
                        ...currentUser,
                        selectedSort: val,
                      });
                  }}
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
                  defaultValue={
                    expenseFilter === 0
                      ? "None"
                      : currentUser?.selectedCategory || selectedFilter
                  }
                  setOption={(val) => {
                    setSelectedFilter(val);

                    const filter = currentUser?.categories.filter(
                      (item) => item.label === val,
                    )[0];

                    setExpenseFilter(filter?.id || 0);

                    currentUser &&
                      setCurrentUser({
                        ...currentUser,
                        selectedCategory: val,
                      });
                  }}
                />
              )}
            </S.Selectors>
            <S.ItemWrapper>
              <S.ItemContainer>
                {!budget.length && <Loading />}
                {!!budget.length &&
                  budget[budgetIndex][type]
                    .sort((a: BudgetDataItem, b: BudgetDataItem) =>
                      sortBudget(a, b, selectedSort),
                    )
                    .filter((response: BudgetDataItem) =>
                      expenseFilter === 0
                        ? response
                        : response.category_id === expenseFilter,
                    )
                    .map((data: BudgetDataItem, i: number) => {
                      if (data.label === "" && !data.budget_id && !data.temp) {
                        return {};
                      }

                      const currentItems: BudgetDataItem[] = [
                        ...budget[budgetIndex][type],
                      ];

                      return (
                        <BudgetItem
                          key={i}
                          theType={type as InputOption}
                          item={data}
                          labelPlaceHolder={`${type.toLowerCase()} name`}
                          valuePlaceHolder={`${type.toLowerCase()} (USD)`}
                          inputType="number"
                          budgetItemData={budget[budgetIndex]}
                          saveEvent={handleSaveEvent}
                          deleteEvent={() =>
                            handleDeleteEvent(currentItems, data)
                          }
                          hidePaidContent={type === "income"}
                          openModal={isNewBudget}
                          index={i}
                        />
                      );
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
      <SessionExpired
        isOpen={isSessionExpired}
        closeModal={setIsSessionExpired}
      />
    </S.MonthlyWrapper>
  );
};

export default Monthly;
