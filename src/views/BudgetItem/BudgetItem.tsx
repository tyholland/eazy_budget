import React, { useState } from "react";
import Input from "../../components/Input/Input.tsx";
import EditIcon from "../../svg/EditIcon.tsx";
import SaveIcon from "../../svg/SaveIcon.tsx";
import DeleteIcon from "../../svg/DeleteIcon.tsx";
import { BudgetDataItem, InputOption, InputType } from "../../types.ts";
import Button from "../../components/Button/Button.tsx";
import * as S from "./budgetItem.style.ts";
import CancelIcon from "../../svg/CancelIcon.tsx";

interface BudgetItemProps {
  theType: InputOption;
  item?: BudgetDataItem;
  editable?: boolean;
  labelPlaceHolder?: string;
  valuePlaceHolder?: string;
  inputType?: InputType;
}

const BudgetItem = ({
  theType,
  item,
  editable = false,
  valuePlaceHolder = "",
  labelPlaceHolder = "",
  inputType = "text",
}: BudgetItemProps) => {
  const [isEditable, setIsEditable] = useState<boolean>(editable);

  return (
    <S.Item>
      <Input
        inputLabel={item?.label || ""}
        inputOption={theType}
        defaultValue={item?.value}
        editableLabel={isEditable}
        editableValue={isEditable}
        labelPlaceHolder={labelPlaceHolder}
        valuePlaceHolder={valuePlaceHolder}
        type={inputType}
        inputSize="medium"
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
            <CancelIcon />
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
