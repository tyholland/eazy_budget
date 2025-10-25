import React, { useEffect, useState } from "react";
import {
  BudgetData,
  BudgetDataItem,
  InputOption,
  NewBudgetIds,
  User,
} from "../../types.ts";
import * as S from "./clientDetails.style.ts";
import BudgetItem from "../../views/BudgetItem/BudgetItem.tsx";
import {
  budgetSortOptions,
  listOfBudgets,
  listOfMonths,
  listOfQuarterlyMonths,
} from "../../constants.ts";
import {
  addNewBudgetItem,
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
import Loading from "../../components/Loading/Loading.tsx";
import SelectComponent from "../../components/Select/Select.tsx";
import DownloadCsv from "../../components/DownloadCsv/DownloadCsv.tsx";
import { trackError, trackEvent } from "../../functions/mixpanel.ts";
import Predict from "../../components/Predict/Predict.tsx";
import SessionExpired from "../../components/SessionExpired/SessionExpired.tsx";
import ClientDetailsNav from "../../views/ClientDetailsNav/ClientDetailsNav.tsx";
import moment from "moment-business-days";
import { getClientBudgetInfo, getClientInfo } from "../../requests/referral.ts";

const ClientDetails = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [clientBudget, setClientBudget] = useState<BudgetData[] | []>([]);
  const [currentClient, setCurrentClient] = useState<User | undefined>(
    undefined,
  );
  const params = new URLSearchParams(window.location.search);
  const clonedBudget = [...clientBudget];
  const date = new Date();
  const month = moment(date).format("MMMM").toLocaleLowerCase();
  const year = moment(date).format("YYYY");
  const type = params.get("type") || "income";
  const [selectedOption, setSelectedOption] = useState<string | undefined>(
    type,
  );
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isNewBudget, setIsNewBudget] = useState<boolean>(false);
  const [selectedSort, setSelectedSort] = useState<string>(
    currentClient?.selectedSort || budgetSortOptions[0].label,
  );
  const [selectedFilter, setSelectedFilter] = useState<string>(
    currentClient?.selectedCategory || "None",
  );
  const filter = currentClient?.categories.filter(
    (item) => item.label === currentClient.selectedCategory,
  )[0];
  const [expenseFilter, setExpenseFilter] = useState<number | undefined>(
    filter?.id || 0,
  );
  const isPro = getSubscriptionStatus("Pro", currentClient?.subscription_id);
  const [isSessionExpired, setIsSessionExpired] = useState<boolean>(false);

  useEffect(() => {
    if (type === "income") {
      setExpenseFilter(0);
      setSelectedFilter("None");
    }
  }, [type]);

  const getClientData = async () => {
    try {
      const accessToken = await getAccessTokenSilently({
        authorizationParams: {
          audience: process.env.REACT_APP_AUDIENCE,
        },
      });

      const response = await getClientInfo(accessToken, 1);

      setCurrentClient(response);
    } catch (err) {
      trackError("PrivateRoute - getBudgetInfo:", { result: err });
    }
  };

  const getClientBudget = async () => {
    try {
      const accessToken = await getAccessTokenSilently({
        authorizationParams: {
          audience: process.env.REACT_APP_AUDIENCE,
        },
      });

      const response = await getClientBudgetInfo(accessToken, 1);

      setClientBudget(response.budget);
    } catch (err) {
      trackError("PrivateRoute - getBudgetInfo:", { result: err });
    }
  };

  useEffect(() => {
    getClientData();
    getClientBudget();
  }, []);

  if (
    !type ||
    !listOfBudgets.includes(type) ||
    !listOfMonths.includes(month) ||
    isNaN(Number(year))
  ) {
    return <ErrorPage />;
  }

  const theYear = Number(year);

  const totalIncome = getMonthlyTotalAmount(
    clientBudget,
    month,
    theYear,
    "income",
  );
  const totalExpense = getMonthlyTotalAmount(
    clientBudget,
    month,
    theYear,
    "expense",
  );
  const budgetIndex = clonedBudget.findIndex(
    (item) => item.year === theYear && item.month === month,
  );

  const handleAddNewBudget = () => {
    const updatedBudget = addNewBudgetItem(clonedBudget, month, theYear, type);

    setClientBudget(updatedBudget);
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
          clientBudget,
          data,
          month,
          theYear,
          type,
        );

        if (updatedItem[0].cadence === "Future Months" && !!updatedBudgets) {
          const tempBudget = [...clientBudget];

          for (let i = budgetIndex; i <= 11; i++) {
            const count = i - budgetIndex;

            tempBudget[i][type] = updatedBudgets[count];
          }

          setClientBudget(tempBudget);
        }

        if (updatedItem[0].cadence === "All Months" && !!updatedBudgets) {
          const tempBudget = [...clientBudget];

          if (updatedItem[0].frequency === "Quarterly") {
            for (let i = 0; i <= 11; i++) {
              if (i === 2 || i === 5 || i === 8 || i === 11) {
                tempBudget[i][type] = updatedBudgets[i];
              }
            }

            setClientBudget(tempBudget);
          } else {
            for (let i = 0; i <= 11; i++) {
              tempBudget[i][type] = updatedBudgets[i];
            }

            setClientBudget(tempBudget);
          }
        }

        if (updatedItem[0].cadence === "Current Month") {
          const tempBudget = [...clientBudget];
          tempBudget[budgetIndex][type] = updatedBudgets;
          setClientBudget(tempBudget);
        }

        await updateBudgetItem(accessToken, updatedItem[0]);

        trackEvent(`Edit ${type}`);
      } else {
        insertBasedOnCadence(
          item as BudgetData,
          updatedItem[0],
          clientBudget,
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
          clientBudget,
          month,
          theYear,
          type,
          updatedBudgetItem,
        );

        if (updatedItem[0].cadence === "Future Months" && !!insertedBudgets) {
          const tempBudget = [...clientBudget];

          for (let i = budgetIndex; i <= 11; i++) {
            const count = i - budgetIndex;

            tempBudget[i][type] = insertedBudgets[count];
          }

          setClientBudget(tempBudget);
        }

        if (updatedItem[0].cadence === "All Months" && !!insertedBudgets) {
          const tempBudget = [...clientBudget];

          if (updatedItem[0].frequency === "Quarterly") {
            for (let i = 0; i <= 11; i++) {
              if (i === 2 || i === 5 || i === 8 || i === 11) {
                tempBudget[i][type] = insertedBudgets[i];
              }
            }

            setClientBudget(tempBudget);
          } else {
            for (let i = 0; i <= 11; i++) {
              tempBudget[i][type] = insertedBudgets[i];
            }

            setClientBudget(tempBudget);
          }
        }

        if (updatedItem[0].cadence === "Current Month") {
          const tempBudget = [...clientBudget];
          tempBudget[budgetIndex][type] = insertedBudgets;
          setClientBudget(tempBudget);
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
        const tempBudget = [...clientBudget];
        tempBudget[budgetIndex][type] = updatedItems;

        setClientBudget(tempBudget);
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

    const tempBudget = [...clientBudget];
    tempBudget[budgetIndex][type] = updatedItems;
    setClientBudget(tempBudget);

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
    <>
      <div>Add client name</div>
      <S.MonthlyWrapper>
        <ClientDetailsNav
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
        />
        <S.ContentWrapper>
          <S.Title>
            {selectedOption !== "goals" && `${month} ${theYear}`}{" "}
            {selectedOption}
          </S.Title>
          {selectedOption === type && (
            <>
              <S.Selectors>
                {getSubscriptionStatus(
                  "Starter",
                  currentClient?.subscription_id,
                ) && (
                  <SelectComponent
                    options={budgetSortOptions}
                    placeHolder="Sort Items"
                    defaultValue={currentClient?.selectedSort || selectedSort}
                    setOption={(val) => {
                      setSelectedSort(val);

                      currentClient &&
                        setCurrentClient({
                          ...currentClient,
                          selectedSort: val,
                        });
                    }}
                  />
                )}
                {isPro && type === "expense" && (
                  <SelectComponent
                    options={
                      currentClient?.categories.concat({
                        id: 0,
                        label: "None",
                      }) || []
                    }
                    placeHolder="Filter by Category"
                    defaultValue={
                      expenseFilter === 0
                        ? "None"
                        : currentClient?.selectedCategory || selectedFilter
                    }
                    setOption={(val) => {
                      setSelectedFilter(val);

                      const filter = currentClient?.categories.filter(
                        (item) => item.label === val,
                      )[0];

                      setExpenseFilter(filter?.id || 0);

                      currentClient &&
                        setCurrentClient({
                          ...currentClient,
                          selectedCategory: val,
                        });
                    }}
                  />
                )}
              </S.Selectors>
              <S.ItemWrapper>
                <S.ItemContainer>
                  {!clientBudget.length && <Loading />}
                  {!!clientBudget.length &&
                    clientBudget[budgetIndex][type]
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

                        const currentItems: BudgetDataItem[] = [
                          ...clientBudget[budgetIndex][type],
                        ];

                        return (
                          <BudgetItem
                            key={i}
                            theType={type as InputOption}
                            item={data}
                            labelPlaceHolder={`${type.toLowerCase()} name`}
                            valuePlaceHolder={`${type.toLowerCase()} (USD)`}
                            inputType="number"
                            budgetItemData={clientBudget[budgetIndex]}
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
              {isPro && (
                <DownloadCsv
                  type="monthly"
                  clientBudget={clientBudget}
                  currentClient={currentClient}
                />
              )}
            </>
          )}
          {selectedOption === "goals" && <Predict />}
        </S.ContentWrapper>
        <SessionExpired
          isOpen={isSessionExpired}
          closeModal={setIsSessionExpired}
        />
      </S.MonthlyWrapper>
    </>
  );
};

export default ClientDetails;
