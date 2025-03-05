import React, { ChangeEvent, useState } from "react";
import { ElementSize, InputOption, InputType } from "../../types.ts";
import * as S from "./input.style.ts";
import { formatAmount } from "../../functions/helper.ts";
import { UseFormRegister } from "react-hook-form";

interface InputProps {
  inputLabel: string;
  register?: UseFormRegister<any>;
  inputOption?: InputOption;
  isEditable?: boolean;
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
}: InputProps) => {
  const [inputValue, setInputValue] = useState<number | string>(defaultValue);
  const [updatedLabel, setUpdatedLabel] = useState<string>(inputLabel);

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
            value={updatedLabel}
            onChange={handleLabelOnChange}
            placeholder={labelPlaceHolder}
          />
          <S.Input
            type={type}
            className={`${inputSize} ${inputOption}`}
            onChange={handleValueOnChange}
            value={inputValue}
            placeholder={valuePlaceHolder}
          />
        </>
      )}

      {!isEditable && (
        <>
          <S.Label htmlFor={updatedLabel}>{updatedLabel}</S.Label>
          {register && (
            <S.Input
              type={"text"}
              id={updatedLabel}
              {...register(updatedLabel)}
              className={`${inputSize} ${inputOption}`}
              disabled
              value={formatAmount(Number(inputValue))}
            />
          )}
          {!register && (
            <S.Input
              type={"text"}
              id={updatedLabel}
              className={`${inputSize} ${inputOption}`}
              disabled
              value={formatAmount(Number(inputValue))}
            />
          )}
        </>
      )}
    </S.InputWrapper>
  );
};

export default Input;
