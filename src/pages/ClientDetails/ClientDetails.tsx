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
  emailAddress,
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
  updateBasedOnCadence,
} from "../../functions/budget.ts";
import Button from "../../components/Button/Button.tsx";
import AddIcon from "../../svg/AddIcon.tsx";
import ModalComponent from "../../components/Modal/Modal.tsx";
import {
  checkIsExpiredSession,
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
import DownloadCsv from "../../components/DownloadCsv/DownloadCsv.tsx";
import { trackError, trackEvent } from "../../functions/mixpanel.ts";
import Predict from "../../components/Predict/Predict.tsx";
import SessionExpired from "../../components/SessionExpired/SessionExpired.tsx";
import ClientDetailsNav from "../../views/ClientDetailsNav/ClientDetailsNav.tsx";
import moment from "moment-business-days";
import { getClientBudgetInfo, getClientInfo } from "../../requests/referral.ts";
import { useParams } from "react-router-dom";
import { useAtomValue } from "jotai";
import { userAtom } from "../../hook/UserAtom.ts";

const ClientDetails = () => {
  const { getAccessTokenSilently } = useAuth0();
  const currentUser = useAtomValue(userAtom);
  const clientParam = useParams();
  const clientId = clientParam.client;
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
  const [isSessionExpired, setIsSessionExpired] = useState<boolean>(false);
  const [notAllowed, setNotAllowed] = useState<boolean>(false);
  const clientData = currentUser?.all_referrals.filter(
    (item) => item.id === Number(clientId),
  )[0];

  const getClientData = async () => {
    try {
      const accessToken = await getAccessTokenSilently({
        authorizationParams: {
          audience: process.env.REACT_APP_AUDIENCE,
        },
      });

      const response = await getClientInfo(accessToken, Number(clientId));

      if (response.status === 404) {
        setNotAllowed(true);
        return;
      }
      setCurrentClient(response);
    } catch (err) {
      trackError("ClientDetails - getClientData:", { result: err });
      setNotAllowed(true);

      if (checkIsExpiredSession(err)) {
        setIsSessionExpired(true);
      }
    }
  };

  const getClientBudget = async () => {
    try {
      const accessToken = await getAccessTokenSilently({
        authorizationParams: {
          audience: process.env.REACT_APP_AUDIENCE,
        },
      });

      const response = await getClientBudgetInfo(accessToken, Number(clientId));

      if (response.status === 404) {
        setNotAllowed(true);
        return;
      }

      setClientBudget(response.budget);
    } catch (err) {
      trackError("ClientDetails - getClientBudget:", { result: err });
      setNotAllowed(true);

      if (checkIsExpiredSession(err)) {
        setIsSessionExpired(true);
      }
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

  if (notAllowed) {
    return (
      <S.Container>
        <S.ErrorTitle>
          You don't have access to this client. Please contact us at{" "}
          <a href={`mailto:${emailAddress}`}>{emailAddress}</a> if you believe
          you should have access to this client.
        </S.ErrorTitle>
        <ErrorPage />
      </S.Container>
    );
  }

  if (!currentClient?.hasBudget) {
    return (
      <S.Container>
        <S.ErrorTitle>
          {!!clientData?.first_name
            ? `${clientData.first_name} ${clientData.last_name}`
            : clientData?.email}{" "}
          has not yet uploaded their budget information. Please contact the
          client and request that they add their budget details to enable
          viewing.
        </S.ErrorTitle>
        <ErrorPage />
      </S.Container>
    );
  }

  return (
    <>
      <S.ClientName>
        Viewing{" "}
        {!!clientData?.first_name
          ? `${clientData.first_name} ${clientData.last_name}`
          : clientData?.email}
        's account
      </S.ClientName>
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
              <S.ItemWrapper>
                <S.ItemContainer>
                  {!clientBudget.length && <Loading />}
                  {!!clientBudget.length &&
                    clientBudget[budgetIndex][type].map(
                      (data: BudgetDataItem, i: number) => {
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
                      },
                    )}
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
            <>
              <BudgetDetails
                income={totalIncome}
                expense={totalExpense}
                month={month}
                year={theYear}
              />
              <DownloadCsv
                type="monthly"
                clientBudget={clientBudget}
                currentClient={currentClient}
              />
            </>
          )}
          {selectedOption === "goals" && (
            <Predict
              clientBudget={clientBudget}
              currentClient={currentClient}
            />
          )}
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
