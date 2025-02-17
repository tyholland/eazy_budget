import React from "react";
import { BudgetData, InputOption } from "../../types.ts";
import { useParams } from "react-router-dom";
import { expenseAtom } from "../../hook/ExpenseAtom.ts";
import { useAtom } from "jotai";
import { getDateInfo } from "../../functions/helper.ts";
import * as S from "./monthly.style.ts";
import BudgetItem from "../../views/BudgetItem/BudgetItem.tsx";

const Monthly = () => {
  const [expense, setExpense] = useAtom(expenseAtom);
  const { year, month } = getDateInfo();
  const { type } = useParams();
  let monthType = type as InputOption;

  if (type !== "expense" || type !== "expense") {
    monthType = "income";
  }

  return (
    <div>
      <S.Title>
        {month} {year} {monthType}
      </S.Title>
      <S.ItemWrapper>
        {expense?.map((item: BudgetData) => {
          if (month === item.month && year === item.year) {
            return <BudgetItem monthType={monthType} item={item} />;
          }
          return null;
        })}
      </S.ItemWrapper>
    </div>
  );
};

export default Monthly;
