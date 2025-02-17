import React, { useState } from "react";
import Input from "../../components/Input/Input.tsx";
import EditIcon from "../../svg/EditIcon.tsx";
import SaveIcon from "../../svg/SaveIcon.tsx";
import DeleteIcon from "../../svg/DeleteIcon.tsx";
import { BudgetData, InputOption } from "../../types.ts";
import { useParams } from "react-router-dom";
import { expenseAtom } from "../../hook/ExpenseAtom.ts";
import { useAtom } from "jotai";
import Button from "../../components/Button/Button.tsx";
import { getDateInfo } from "../../functions/helper.ts";
import * as S from "./monthly.style.ts";

const Monthly = () => {
  const [expense, setExpense] = useAtom(expenseAtom);
  const [isEditable, setIsEditable] = useState<boolean>(false);
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
            return (
              <S.Item key={item.label}>
                <Input
                  inputLabel={item.label}
                  inputOption={monthType}
                  defaultValue={item.value}
                  editableLabel={isEditable}
                  editableValue={isEditable}
                />
                {!isEditable && (
                  <Button type="image" handleClick={() => setIsEditable(true)}>
                    <EditIcon />
                  </Button>
                )}
                {isEditable && (
                  <>
                    <Button
                      type="image"
                      handleClick={() => setIsEditable(false)}
                    >
                      <SaveIcon />
                    </Button>
                    <Button
                      type="image"
                      handleClick={() => setIsEditable(false)}
                    >
                      <DeleteIcon />
                    </Button>
                  </>
                )}
              </S.Item>
            );
          }
          return null;
        })}
      </S.ItemWrapper>
    </div>
  );
};

export default Monthly;
