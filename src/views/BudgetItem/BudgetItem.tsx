import React, { useEffect, useState, JSX } from "react";
import BudgetInput from "../../components/BudgetInput/BudgetInput.tsx";
import EditIcon from "../../svg/EditIcon.tsx";
import SaveIcon from "../../svg/SaveIcon.tsx";
import DeleteIcon from "../../svg/DeleteIcon.tsx";
import { BudgetDataItem, InputOption, InputType } from "../../types.ts";
import Button from "../../components/Button/Button.tsx";
import * as S from "./budgetItem.style.ts";
import { UseFormRegister } from "react-hook-form";
import CheckboxComponent from "../../components/Checkbox/Checkbox.tsx";
import { Tooltip as ReactTooltip } from "react-tooltip";

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

  useEffect(() => {
    item && setUpdatedLabel(item.label);
  }, [item?.label]);

  useEffect(() => {
    item && setCheckedVal(item.paid || false);
  }, [item?.paid]);

  return (
    <S.ItemWrapper>
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
      </S.Item>
      {children}
      {!hideBtn && (
        <>
          {!isEditable && (
            <span data-tooltip-id="edit-tooltip">
              <Button classType="text" handleClick={() => setIsEditable(true)}>
                <EditIcon />
              </Button>
            </span>
          )}
          {isEditable && (
            <S.BtnWrapper>
              <span data-tooltip-id="save-tooltip">
                <Button
                  classType="text"
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
              </span>
              <span data-tooltip-id="delete-tooltip">
                <Button
                  classType="text"
                  handleClick={() => {
                    deleteEvent && deleteEvent();
                    setIsEditable(false);
                  }}
                >
                  <DeleteIcon />
                </Button>
              </span>
            </S.BtnWrapper>
          )}
          <ReactTooltip
            id="edit-tooltip"
            place="top"
            variant="info"
            content={`Edit ${theType} item`}
            className="tooltip"
          />
          <ReactTooltip
            id="save-tooltip"
            place="top"
            variant="info"
            content={`Save ${theType} item`}
            className="tooltip"
          />
          <ReactTooltip
            id="delete-tooltip"
            place="top"
            variant="info"
            content={`Delete ${theType} item`}
            className="tooltip"
          />
        </>
      )}
    </S.ItemWrapper>
  );
};

export default BudgetItem;
