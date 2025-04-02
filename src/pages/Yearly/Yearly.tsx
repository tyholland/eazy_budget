import React, { useEffect, useState } from "react";
import { BudgetDataItem, GraphType, InputOption } from "../../types.ts";
import { useParams, useNavigate } from "react-router-dom";
import { budgetAtom } from "../../hook/BudgetAtom.ts";
import { useAtomValue } from "jotai";
import * as S from "./yearly.style.ts";
import BudgetItem from "../../views/BudgetItem/BudgetItem.tsx";
import Select from "../../components/Select/Select.tsx";
import Graph from "../../components/Graph/Graph.tsx";
import {
  budgetOptions,
  budgetViewMatch,
  graphColors,
  listOfBudgets,
  viewOptions,
} from "../../constants.ts";
import {
  getYearlyBudgetBreakdown,
  getYearlyTotalAmount,
} from "../../functions/budget.ts";
import { Tooltip as ReactTooltip } from "react-tooltip";
import ViewIcon from "../../svg/ViewIcon.tsx";
import Link from "../../components/Link/Link.tsx";
import ErrorPage from "../../views/ErrorPage/ErrorPage.tsx";
import BudgetInput from "../../components/BudgetInput/BudgetInput.tsx";
import { getSubscriptionStatus } from "../../functions/helper.ts";
import { userAtom } from "../../hook/UserAtom.ts";
import BudgetNav from "../../views/BudgetNav/BudgetNav.tsx";
import BudgetDetails from "../../views/BudgetDetails/BudgetDetails.tsx";

const Yearly = () => {
  const budget = useAtomValue(budgetAtom);
  const currentUser = useAtomValue(userAtom);
  const navigate = useNavigate();
  const { type, year } = useParams();
  const [selectedView, setSelectedView] = useState<string>(
    viewOptions[0].label,
  );
  const [selectedType, setSelectedType] = useState<string | undefined>(type);
  const [selectedOption, setSelectedOption] = useState<string | undefined>(
    type,
  );

  useEffect(() => {
    if (selectedType !== type) {
      navigate(`/yearly/${selectedType?.toLowerCase()}/${theYear}`);
    }
  }, [selectedType]);

  if (!type || !year || !listOfBudgets.includes(type) || isNaN(Number(year))) {
    return <ErrorPage />;
  }

  const theYear = Number(year);

  const yearlyTotalIncome = getYearlyTotalAmount(budget, theYear, "income");
  const yearlyTotalExpense = getYearlyTotalAmount(budget, theYear, "expense");
  const cashFlow = yearlyTotalIncome - yearlyTotalExpense;
  const expenseToIncome = (
    (yearlyTotalExpense / yearlyTotalIncome) *
    100
  ).toFixed(2);
  const { data, labels, newBudget } = getYearlyBudgetBreakdown(
    budget,
    theYear,
    type,
  );

  return (
    <S.YearlylyWrapper>
      <BudgetNav
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
        setSelectedType={setSelectedType}
        setSelectedView={setSelectedView}
      />
      <S.ContentWrapper>
        <S.Title>
          {theYear} {type}
        </S.Title>
        {selectedOption === type && (
          <S.ItemWrapper>
            {!newBudget.length && <div>Loading...</div>}
            {newBudget.map((data: BudgetDataItem, i: number) => {
              return (
                <BudgetItem
                  key={i}
                  theType={type as InputOption}
                  item={data}
                  hideBtn
                  hideCheckbox
                >
                  <span data-tooltip-id={`monthly-${type}-tooltip`}>
                    <Link
                      url={`/monthly/${type}/${data.label}/${theYear}`}
                      label={`view breakdown of ${data.label} ${type}`}
                    >
                      <ViewIcon />
                    </Link>
                  </span>
                </BudgetItem>
              );
            })}
          </S.ItemWrapper>
        )}
        {selectedOption === "details" && (
          <BudgetDetails
            income={yearlyTotalIncome}
            expense={yearlyTotalExpense}
          />
        )}
        {selectedOption === "charts" && (
          <>
            <S.SelectWrapper>
              <Select
                options={viewOptions}
                placeHolder="Change View"
                defaultValue={viewOptions[0].label}
                setOption={setSelectedView}
              />
            </S.SelectWrapper>
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
          </>
        )}
        <ReactTooltip
          id={`monthly-${type}-tooltip`}
          place="top"
          variant="info"
          content={`View a detailed breakdown of this ${type}`}
          className="tooltip"
        />
      </S.ContentWrapper>
    </S.YearlylyWrapper>
  );
};

export default Yearly;
