import React, { useState } from "react";
import { BudgetDataItem, InputOption } from "../../types.ts";
import { useParams } from "react-router-dom";
import { budgetAtom } from "../../hook/BudgetAtom.ts";
import { useAtomValue } from "jotai";
import * as S from "./yearly.style.ts";
import BudgetItem from "../../views/BudgetItem/BudgetItem.tsx";
import Graph from "../../components/Graph/Graph.tsx";
import { graphColors, listOfBudgets } from "../../constants.ts";
import {
  getYearlyBudgetBreakdown,
  getYearlyTotalAmount,
} from "../../functions/budget.ts";
import { Tooltip as ReactTooltip } from "react-tooltip";
import ViewIcon from "../../svg/ViewIcon.tsx";
import Link from "../../components/Link/Link.tsx";
import ErrorPage from "../../views/ErrorPage/ErrorPage.tsx";
import BudgetNav from "../../views/BudgetNav/BudgetNav.tsx";
import BudgetDetails from "../../views/BudgetDetails/BudgetDetails.tsx";
import Loading from "../../components/Loading/Loading.tsx";
import { DARKER_GRAY } from "../../index.style.ts";
import DownloadCsv from "../../components/DownloadCsv/DownloadCsv.tsx";
import { userAtom } from "../../hook/UserAtom.ts";
import { getSubscriptionStatus } from "../../functions/helper.ts";
import Predict from "../../components/Predict/Predict.tsx";

const Yearly = () => {
  const budget = useAtomValue(budgetAtom);
  const currentUser = useAtomValue(userAtom);
  const { type, year } = useParams();
  const [selectedOption, setSelectedOption] = useState<string | undefined>(
    type,
  );
  const isPro = getSubscriptionStatus("Pro", currentUser?.subscription_id);

  if (!type || !year || !listOfBudgets.includes(type) || isNaN(Number(year))) {
    return <ErrorPage />;
  }

  const theYear = Number(year);

  const yearlyTotalIncome = getYearlyTotalAmount(budget, theYear, "income");
  const yearlyTotalExpense = getYearlyTotalAmount(budget, theYear, "expense");
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
        incomeUrl={`/yearly/income/${theYear}`}
        expenseUrl={`/yearly/expense/${theYear}`}
      />
      <S.ContentWrapper>
        <S.Title>
          {selectedOption !== "goals" && theYear} {selectedOption}
        </S.Title>
        {selectedOption === type && (
          <S.ItemWrapper>
            {!newBudget.length && <Loading />}
            {newBudget.map((data: BudgetDataItem, i: number) => {
              return (
                <BudgetItem
                  key={i}
                  theType={type as InputOption}
                  item={data}
                  hideBtn
                  hidePaidContent
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
          <>
            <BudgetDetails
              income={yearlyTotalIncome}
              expense={yearlyTotalExpense}
              hideExpensesPaid
            />
            {isPro && <DownloadCsv type="yearly" />}
          </>
        )}
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
            page="yearly"
          />
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
