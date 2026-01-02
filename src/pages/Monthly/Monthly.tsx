import React, { useEffect, useState } from "react";
import { BudgetData, BudgetDataItem, InputOption } from "../../types.ts";
import { useNavigate, useParams } from "react-router-dom";
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
  monthSelect,
} from "../../constants.ts";
import {
  addNewBudgetItem,
  getMonthlyBudgetBreakdown,
  getMonthlyTotalAmount,
  reformatBudgetItem,
  sortBudget,
} from "../../functions/budget.ts";
import Button from "../../components/Button/Button.tsx";
import AddIcon from "../../svg/AddIcon.tsx";
import ModalComponent from "../../components/Modal/Modal.tsx";
import {
  capitalizePageTitle,
  checkIsExpiredSession,
  getSubscriptionStatus,
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
import FilterIcon from "../../svg/FilterIcon.tsx";
import ViewIcon from "../../svg/ViewIcon.tsx";

const Monthly = () => {
  const navigate = useNavigate();
  const { getAccessTokenSilently } = useAuth0();
  const [budget, setBudget] = useAtom(budgetAtom);
  const [currentUser, setCurrentUser] = useAtom(userAtom);
  const clonedBudget = [...budget];
  const { type, month, year } = useParams();
  const [selectedOption, setSelectedOption] = useState<string | undefined>(
    type,
  );
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isOverviewOpen, setIsOverviewOpen] = useState<boolean>(false);
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
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
  const [isLoadingData, setIsLoadingData] = useState<boolean>(false);

  useEffect(() => {
    if (type === "income") {
      setExpenseFilter(0);
      setSelectedFilter("None");
    }

    type === "expense" &&
      selectedOption !== "insights" &&
      setSelectedOption(type);
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

    console.error("updatedBudget:", updatedBudget);
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
    setIsLoadingData(true);
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
        },
      });

      if (!!data?.budget_id) {
        const updatedBudget = await updateBudgetItem(
          accessToken,
          updatedItem[0],
        );

        setBudget(updatedBudget.budget);

        if (
          type === "income" &&
          !currentUser?.medal_game.edit_income_in_month
        ) {
          !!currentUser &&
            setCurrentUser({
              ...currentUser,
              medal_game: {
                ...currentUser.medal_game,
                edit_income_in_month: true,
                total_medal_points:
                  currentUser.medal_game.total_medal_points + 6,
              },
            });
        }

        if (
          type === "expense" &&
          !currentUser?.medal_game.edit_expense_in_month
        ) {
          !!currentUser &&
            setCurrentUser({
              ...currentUser,
              medal_game: {
                ...currentUser.medal_game,
                edit_expense_in_month: true,
                total_medal_points:
                  currentUser.medal_game.total_medal_points + 7,
              },
            });
        }

        trackEvent(`Edit ${type}`);
        setIsLoadingData(false);
      } else {
        updatedItem[0].type = type;
        const addedBudget = await addBudgetItem(accessToken, updatedItem[0]);

        setBudget(addedBudget.budget);

        trackEvent(`Add New ${type}`);
        setIsLoadingData(false);
      }

      setIsNewBudget(false);
    } catch (err) {
      setIsLoadingData(false);
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
    setIsLoadingData(true);

    try {
      const accessToken = await getAccessTokenSilently({
        authorizationParams: {
          audience: process.env.REACT_APP_AUDIENCE,
          scope: "read:user",
        },
      });

      if (!!data.budget_id) {
        const deletedBudget = await deleteBudgetItem(
          accessToken,
          data.budget_id,
        );
        setBudget(deletedBudget.budget);

        trackEvent(`Delete ${type}`);
      }

      setIsNewBudget(false);
      setIsLoadingData(false);
    } catch (err) {
      setIsLoadingData(false);
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
      <S.Title>{`${month} ${theYear}`}</S.Title>
      <BudgetNav
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
        incomeUrl={`/monthly/income/${month}/${theYear}`}
        expenseUrl={`/monthly/expense/${month}/${theYear}`}
      />
      <S.ContentWrapper>
        {selectedOption === type && (
          <>
            <S.BudgetOptions>
              <Button
                buttonSize="small"
                classType="text"
                handleClick={() => setIsFilterOpen(true)}
              >
                <>
                  <FilterIcon /> Filter
                </>
              </Button>
              <Button
                buttonSize="small"
                classType="text"
                handleClick={() => setIsOverviewOpen(true)}
              >
                <>
                  <ViewIcon /> Overview
                </>
              </Button>
            </S.BudgetOptions>
            <S.ItemWrapper>
              <S.ItemContainer>
                {!budget.length && <Loading isText />}
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
              <S.AddBtn>
                <Button buttonSize="medium" handleClick={handleAddNewBudget}>
                  <>
                    <AddIcon /> {`Add ${type}`}
                  </>
                </Button>
              </S.AddBtn>
            )}
          </>
        )}
        {selectedOption === "details" && <DownloadCsv type="monthly" />}
        {selectedOption === "goals" && <Predict />}
        {selectedOption === "insights" && (
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
      <ModalComponent
        isOpen={isOverviewOpen}
        title={`${capitalizePageTitle(month)} Overview`}
        size="medium"
      >
        <S.ModalWrapper>
          <BudgetDetails
            income={totalIncome}
            expense={totalExpense}
            month={month}
            year={theYear}
          />
          <S.ModalBtn>
            <Button
              buttonSize="small"
              handleClick={() => setIsOverviewOpen(false)}
              classType="exit"
            >
              Close
            </Button>
          </S.ModalBtn>
        </S.ModalWrapper>
      </ModalComponent>
      <ModalComponent isOpen={isFilterOpen} title="Filter Budget" size="medium">
        <S.ModalWrapper>
          <S.Selectors>
            <SelectComponent
              options={monthSelect}
              placeHolder="Change Month"
              defaultValue={month}
              setOption={(val) => {
                navigate(`/monthly/expense/${val}/${theYear}`);
                setIsFilterOpen(false);
              }}
            />
            {getSubscriptionStatus("Starter", currentUser?.subscription_id) && (
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
          <S.ModalBtn>
            <Button
              buttonSize="small"
              handleClick={() => setIsFilterOpen(false)}
              classType="exit"
            >
              Close
            </Button>
          </S.ModalBtn>
        </S.ModalWrapper>
      </ModalComponent>
      <ModalComponent isOpen={isLoadingData} title="Loading..." size="medium">
        <S.ModalWrapper>
          Your budget is being updated. Please wait for a moment.
        </S.ModalWrapper>
      </ModalComponent>
    </S.MonthlyWrapper>
  );
};

export default Monthly;
