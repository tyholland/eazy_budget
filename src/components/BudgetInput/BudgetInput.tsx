import React, { ChangeEvent } from "react";
import { ElementSize, InputOption, InputType } from "../../types.ts";
import * as S from "./budgetInput.style.ts";
import { formatAmount } from "../../functions/helper.ts";
import { UseFormRegister } from "react-hook-form";

interface BudgetInputProps {
  inputLabel: string;
  isEditable?: boolean;
  setInputValue?: (val: number | string) => void;
  setUpdatedLabel?: (val: string) => void;
  register?: UseFormRegister<any>;
  inputOption?: InputOption;
  type?: InputType;
  inputSize?: ElementSize;
  defaultValue?: string | number;
  valuePlaceHolder?: string;
  labelPlaceHolder?: string;
  percent?: boolean;
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
  register,
  setInputValue = () => {},
  setUpdatedLabel = () => {},
  percent = false,
}: BudgetInputProps) => {
  const handleLabelOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUpdatedLabel(e.target.value);
  };

  const handleValueOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
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
            value={defaultValue}
            placeholder={valuePlaceHolder}
          />
        </>
      )}

      {!isEditable && (
        <>
          <S.Label aria-label={inputLabel} htmlFor={inputLabel}>
            {inputLabel}
          </S.Label>
          {register && (
            <S.Input
              type={"text"}
              id={inputLabel}
              {...register(inputLabel)}
              className={`${inputSize} ${inputOption}`}
              disabled
              value={formatAmount(Number(defaultValue))}
              aria-label={`${inputLabel} value`}
            />
          )}
          {!register && (
            <S.Input
              type={"text"}
              id={inputLabel}
              className={`${inputSize} ${inputOption}`}
              disabled
              value={
                percent
                  ? `${defaultValue}%`
                  : formatAmount(Number(defaultValue))
              }
              aria-label={`${inputLabel} value`}
            />
          )}
        </>
      )}
    </S.InputWrapper>
  );
};

export default BudgetInput;
