import React from "react";
import { BudgetDataItem, InputOption } from "../../types.ts";
import { useParams } from "react-router-dom";
import { expenseAtom } from "../../hook/ExpenseAtom.ts";
import { useAtom } from "jotai";
import { getDateInfo } from "../../functions/helper.ts";
import * as S from "./monthly.style.ts";
import BudgetItem from "../../views/BudgetItem/BudgetItem.tsx";
import { listOfBudgets, listOfMonths } from "../../constants.ts";

const Monthly = () => {
  const [expense, setExpense] = useAtom(expenseAtom);
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

  return (
    <div>
      <S.Title>
        {month} {currentYear} {type}
      </S.Title>
      <S.ItemWrapper>
        {expense?.[type]?.map((item: BudgetDataItem) => {
          if (
            month === expense.month.toLowerCase() &&
            currentYear === expense.year
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
    </div>
  );
};

export default Monthly;
