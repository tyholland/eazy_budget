import React, { ChangeEvent, useEffect, useState } from "react";
import { ElementSize, InputOption, InputType } from "../../types.ts";
import * as S from "./input.style.ts";
import { formatAmount } from "../../functions/helper.ts";
import { UseFormRegister } from "react-hook-form";

interface InputProps {
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
}

const Input = ({
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
}: InputProps) => {
  const handleLabelOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUpdatedLabel(e.target.value);
  };

  const handleValueOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <S.InputWrapper>
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
          <S.Label htmlFor={inputLabel}>{inputLabel}</S.Label>
          {register && (
            <S.Input
              type={"text"}
              id={inputLabel}
              {...register(inputLabel)}
              className={`${inputSize} ${inputOption}`}
              disabled
              value={formatAmount(Number(defaultValue))}
            />
          )}
          {!register && (
            <S.Input
              type={"text"}
              id={inputLabel}
              className={`${inputSize} ${inputOption}`}
              disabled
              value={formatAmount(Number(defaultValue))}
            />
          )}
        </>
      )}
    </S.InputWrapper>
  );
};

export default Input;
