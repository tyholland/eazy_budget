import React, { ChangeEvent } from "react";
import { ElementSize, InputOption, InputType } from "../../types.ts";
import * as S from "./budgetInput.style.ts";
import {
  formatAmount,
  revertAmountToOriginal,
} from "../../functions/helper.ts";
import { useParams } from "react-router-dom";

interface BudgetInputProps {
  inputLabel: string;
  isEditable?: boolean;
  setInputValue?: (val: number | string) => void;
  setUpdatedLabel?: (val: string) => void;
  setChangeInputVal?: (val: boolean) => void;
  inputOption?: InputOption;
  type?: InputType;
  inputSize?: ElementSize;
  defaultValue?: string | number;
  valuePlaceHolder?: string;
  labelPlaceHolder?: string;
  percent?: boolean;
  frequency?: string;
}

const BudgetInput = ({
  inputSize = "small",
  inputLabel,
  isEditable = false,
  type = "text",
  inputOption = "default",
  defaultValue = "",
  valuePlaceHolder = "",
  labelPlaceHolder = "",
  setInputValue = () => {},
  setUpdatedLabel = () => {},
  setChangeInputVal = () => {},
  percent = false,
  frequency = "Monthly",
}: BudgetInputProps) => {
  const { month, year } = useParams();
  const handleLabelOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUpdatedLabel(e.target.value);
    setChangeInputVal(true);
  };

  const handleValueOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setChangeInputVal(true);
  };

  return (
    <S.InputWrapper className="inputWrapper">
      {isEditable && (
        <>
          <S.Input
            type="text"
            className={`${inputSize} ${inputOption}`}
            value={inputLabel}
            onChange={handleLabelOnChange}
            placeholder={labelPlaceHolder}
          />
          <S.Input
            type={type}
            className={`${inputSize} ${inputOption}`}
            onChange={handleValueOnChange}
            value={
              typeof defaultValue === "number"
                ? revertAmountToOriginal(defaultValue, month, year, frequency)
                : defaultValue
            }
            placeholder={valuePlaceHolder}
          />
        </>
      )}

      {!isEditable && (
        <>
          <S.Label aria-label={inputLabel} htmlFor={inputLabel}>
            {inputLabel}
          </S.Label>
          <S.Input
            type={"text"}
            id={inputLabel}
            className={`${inputSize} ${inputOption}`}
            disabled
            value={
              percent ? `${defaultValue}%` : formatAmount(Number(defaultValue))
            }
            aria-label={`${inputLabel} value`}
          />
        </>
      )}
    </S.InputWrapper>
  );
};

export default BudgetInput;
