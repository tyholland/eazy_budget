import React, { useState } from "react";
import Input from "../../components/Input/Input.tsx";
import EditIcon from "../../svg/EditIcon.tsx";
import SaveIcon from "../../svg/SaveIcon.tsx";
import DeleteIcon from "../../svg/DeleteIcon.tsx";
import { BudgetData, InputOption } from "../../types.ts";
import Button from "../../components/Button/Button.tsx";
import * as S from "./budgetItem.style.ts";

interface BudgetItemProps {
  monthType: InputOption;
  item: BudgetData;
}

const BudgetItem = ({ monthType, item }: BudgetItemProps) => {
  const [isEditable, setIsEditable] = useState<boolean>(false);

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
          <Button type="image" handleClick={() => setIsEditable(false)}>
            <SaveIcon />
          </Button>
          <Button type="image" handleClick={() => setIsEditable(false)}>
            <DeleteIcon />
          </Button>
        </>
      )}
    </S.Item>
  );
};

export default BudgetItem;
