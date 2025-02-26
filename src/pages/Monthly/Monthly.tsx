import React, { useState } from "react";
import { BudgetDataItem, GraphType, InputOption } from "../../types.ts";
import { useParams } from "react-router-dom";
import { budgetAtom } from "../../hook/BudgetAtom.ts";
import { useAtom } from "jotai";
import { getDateInfo } from "../../functions/helper.ts";
import * as S from "./monthly.style.ts";
import BudgetItem from "../../views/BudgetItem/BudgetItem.tsx";
import Select from "../../components/Select/Select.tsx";
import Graph from "../../components/Graph/Graph.tsx";
import {
  budgetOptions,
  budgetViewMatch,
  graphColors,
  listOfBudgets,
  listOfMonths,
  viewOptions,
} from "../../constants.ts";
import Overview from "../../views/Overview/Overview.tsx";
import { getBudgetBreakdown, getTotalAmount } from "../../functions/budget.ts";

const Monthly = () => {
  const [budget, setBudget] = useAtom(budgetAtom);
  const [selectedView, setSelectedView] = useState<string>("Text");
  const { currentYear } = getDateInfo();
  const { type, month } = useParams();

  if (
    !type ||
    !month ||
    !listOfBudgets.includes(type) ||
    !listOfMonths.includes(month)
  ) {
    return <div>Error Page</div>;
  }

  const totalIncome = getTotalAmount(budget?.income);
  const totalExpense = getTotalAmount(budget?.expense);
  const { data, labels } = getBudgetBreakdown(budget?.[type]);

  return (
    <div>
      <S.Title>
        {month} {currentYear} {type}
      </S.Title>
      <Select
        options={budgetOptions}
        placeHolder="Change Budget Type"
        defaultValue={budgetOptions[0].label}
      />
      <Select
        options={viewOptions}
        placeHolder="Change View"
        defaultValue={viewOptions[0].label}
        setView={setSelectedView}
      />
      {selectedView === "Text" && (
        <S.ItemWrapper>
          {budget?.[type]?.map((item: BudgetDataItem) => {
            if (
              month === budget.month.toLowerCase() &&
              currentYear === budget.year
            ) {
              return (
                <BudgetItem
                  key={item.label}
                  monthType={type as InputOption}
                  item={item}
                />
              );
            }
            return null;
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
      <S.TotalBudgetWrapper>
        <Overview
          showLabel={false}
          incomeValue={totalIncome}
          expenseValue={totalExpense}
          hideViewIcon
        />
      </S.TotalBudgetWrapper>
    </div>
  );
};

export default Monthly;
