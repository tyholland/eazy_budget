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
import Graph from "../../components/Graph/Graph.tsx";
import {
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
import BudgetDetails from "../../views/BudgetDetails/BudgetDetails.tsx";
import BudgetNav from "../../views/BudgetNav/BudgetNav.tsx";
import Loading from "../../components/Loading/Loading.tsx";

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
  const [selectedOption, setSelectedOption] = useState<string | undefined>(
    type,
  );
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
      <BudgetNav
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
        setSelectedType={setSelectedType}
        setSelectedView={setSelectedView}
      />
      <S.ContentWrapper>
        <S.Title>
          {month} {theYear} {type}
        </S.Title>
        {selectedOption === type && (
          <>
            <S.ItemWrapper>
              <S.ItemContainer>
                {!budget.length && <Loading />}
                {budget.map((item: BudgetData) => {
                  if (
                    month === item.month.toLowerCase() &&
                    theYear === item.year
                  ) {
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

                            updatedItem[0].budget_id =
                              updatedBudgetItem.budget_id;
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
          <BudgetDetails income={totalIncome} expense={totalExpense} />
        )}
        {selectedOption === "charts" && (
          <Graph
            setSelectedView={setSelectedView}
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
      </S.ContentWrapper>
    </S.MonthlyWrapper>
  );
};

export default Monthly;
