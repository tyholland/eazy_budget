import React, { useEffect, useState } from "react";
import Input from "../../components/Input/Input.tsx";
import EditIcon from "../../svg/EditIcon.tsx";
import SaveIcon from "../../svg/SaveIcon.tsx";
import DeleteIcon from "../../svg/DeleteIcon.tsx";
import { BudgetDataItem, InputOption, InputType } from "../../types.ts";
import Button from "../../components/Button/Button.tsx";
import * as S from "./budgetItem.style.ts";
import CancelIcon from "../../svg/CancelIcon.tsx";
import { UseFormRegister } from "react-hook-form";

interface BudgetItemProps {
  theType: InputOption;
  children?: string | JSX.Element;
  register?: UseFormRegister<any>;
  item?: BudgetDataItem;
  editable?: boolean;
  labelPlaceHolder?: string;
  valuePlaceHolder?: string;
  inputType?: InputType;
  hideBtn?: boolean;
}

const BudgetItem = ({
  theType,
  children,
  item,
  editable = false,
  valuePlaceHolder = "",
  labelPlaceHolder = "",
  inputType = "text",
  hideBtn = false,
  register,
}: BudgetItemProps) => {
  const [isEditable, setIsEditable] = useState<boolean>(editable);

  return (
    <S.Item>
      <Input
        inputLabel={item?.label || ""}
        inputOption={theType}
        defaultValue={item?.value}
        isEditable={isEditable}
        labelPlaceHolder={labelPlaceHolder}
        valuePlaceHolder={valuePlaceHolder}
        type={inputType}
        inputSize="medium"
        register={register}
      />
      {children}
      {!hideBtn && (
        <>
          {!isEditable && (
            <Button classType="image" handleClick={() => setIsEditable(true)}>
              <EditIcon />
            </Button>
          )}
          {isEditable && (
            <>
              <Button
                classType="image"
                handleClick={() => setIsEditable(false)}
              >
                <SaveIcon />
              </Button>
              <Button
                classType="image"
                handleClick={() => setIsEditable(false)}
              >
                <CancelIcon />
              </Button>
              <Button
                classType="image"
                handleClick={() => setIsEditable(false)}
              >
                <DeleteIcon />
              </Button>
            </>
          )}
        </>
      )}
    </S.Item>
  );
};

export default BudgetItem;
