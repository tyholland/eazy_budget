import React, { useEffect, useState } from "react";
import Input from "../../components/Input/Input.tsx";
import EditIcon from "../../svg/EditIcon.tsx";
import SaveIcon from "../../svg/SaveIcon.tsx";
import DeleteIcon from "../../svg/DeleteIcon.tsx";
import { BudgetDataItem, InputOption, InputType } from "../../types.ts";
import Button from "../../components/Button/Button.tsx";
import * as S from "./budgetItem.style.ts";
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
  saveEvent?: (val: Object) => void;
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
  saveEvent,
}: BudgetItemProps) => {
  const [isEditable, setIsEditable] = useState<boolean>(editable);
  const [inputValue, setInputValue] = useState<number | string>(
    item?.value || "",
  );
  const [updatedLabel, setUpdatedLabel] = useState<string>(item?.label || "");

  useEffect(() => {
    item && setInputValue(item.value);
  }, [item?.value]);

  return (
    <S.Item>
      <Input
        inputLabel={updatedLabel}
        inputOption={theType}
        defaultValue={inputValue}
        isEditable={isEditable}
        labelPlaceHolder={labelPlaceHolder}
        valuePlaceHolder={valuePlaceHolder}
        type={inputType}
        inputSize="medium"
        register={register}
        setInputValue={setInputValue}
        setUpdatedLabel={setUpdatedLabel}
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
                handleClick={() => {
                  const item = JSON.parse(`{"${updatedLabel}": ${inputValue}}`);
                  saveEvent && saveEvent(item);
                  setIsEditable(false);
                }}
              >
                <SaveIcon />
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
