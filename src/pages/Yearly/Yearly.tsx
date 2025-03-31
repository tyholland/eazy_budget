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
import Overview from "../../views/Overview/Overview.tsx";
import {
  getYearlyBudgetBreakdown,
  getYearlyTotalAmount,
} from "../../functions/budget.ts";
import { Tooltip as ReactTooltip } from "react-tooltip";
import ViewIcon from "../../svg/ViewIcon.tsx";
import Link from "../../components/Link/Link.tsx";
import ErrorPage from "../../views/ErrorPage/ErrorPage.tsx";
import Carousel from "../../components/Carousel/Carousel.tsx";
import BudgetInput from "../../components/BudgetInput/BudgetInput.tsx";

const Yearly = () => {
  const budget = useAtomValue(budgetAtom);
  const navigate = useNavigate();
  const { type, year } = useParams();
  const [selectedView, setSelectedView] = useState<string>(
    viewOptions[0].label,
  );
  const [selectedType, setSelectedType] = useState<string | undefined>(type);

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
      <S.Title>
        {theYear} {type}
      </S.Title>
      <Carousel>
        <>
          {/*
            Start tier 2 option
          */}
          <S.TotalBudgetWrapper className="emblaSlide">
            <BudgetInput
              inputLabel="Expense to Income Ratio"
              defaultValue={expenseToIncome}
              type="number"
              percent
            />
          </S.TotalBudgetWrapper>
          {/*
            End tier 2 option
          */}
          <S.TotalBudgetWrapper className="emblaSlide">
            <BudgetInput
              inputLabel={`Total ${theYear} income`}
              defaultValue={yearlyTotalIncome}
              type="number"
              inputOption="income"
            />
          </S.TotalBudgetWrapper>
          <S.TotalBudgetWrapper className="emblaSlide">
            <BudgetInput
              inputLabel={`Total ${theYear} expenses`}
              defaultValue={yearlyTotalExpense}
              type="number"
              inputOption="expense"
            />
          </S.TotalBudgetWrapper>
          <S.TotalBudgetWrapper className="emblaSlide">
            <BudgetInput
              inputLabel={`Total ${theYear} remaining cash`}
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
      <ReactTooltip
        id={`monthly-${type}-tooltip`}
        place="top"
        variant="info"
        content={`View a detailed breakdown of this ${type}`}
        className="tooltip"
      />
    </S.YearlylyWrapper>
  );
};

export default Yearly;
