import React, { useEffect, useState } from "react";
import BudgetInput from "../../components/BudgetInput/BudgetInput.tsx";
import EditIcon from "../../svg/EditIcon.tsx";
import SaveIcon from "../../svg/SaveIcon.tsx";
import DeleteIcon from "../../svg/DeleteIcon.tsx";
import { BudgetDataItem, InputOption, InputType } from "../../types.ts";
import Button from "../../components/Button/Button.tsx";
import * as S from "./budgetItem.style.ts";
import { UseFormRegister } from "react-hook-form";
import CheckboxComponent from "../../components/Checkbox/Checkbox.tsx";

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
  hideCheckbox?: boolean;
  saveEvent?: (val: Object, paid?: boolean) => void;
  deleteEvent?: () => void;
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
  hideCheckbox = false,
  register,
  saveEvent,
  deleteEvent,
}: BudgetItemProps) => {
  const [isEditable, setIsEditable] = useState<boolean>(editable);
  const [inputValue, setInputValue] = useState<number | string>(
    item?.value || "",
  );
  const [updatedLabel, setUpdatedLabel] = useState<string>(item?.label || "");
  const [checkedVal, setCheckedVal] = useState<boolean>(item?.paid || false);

  useEffect(() => {
    item && setInputValue(item.value);
  }, [item?.value]);

  return (
    <S.Item>
      <BudgetInput
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
      {!hideCheckbox && (
        <CheckboxComponent
          label="Paid"
          isDisabled={!isEditable}
          setCheckedVal={setCheckedVal}
          isChecked={checkedVal}
        />
      )}
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
                  const budgetItem = JSON.parse(
                    `{"${updatedLabel}": ${inputValue}}`,
                  );
                  saveEvent && saveEvent(budgetItem, checkedVal);
                  setIsEditable(false);
                }}
              >
                <SaveIcon />
              </Button>
              <Button
                classType="image"
                handleClick={() => {
                  deleteEvent && deleteEvent();
                  setIsEditable(false);
                }}
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
