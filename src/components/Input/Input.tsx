import React from "react";
import { ElementSize, InputOption, InputType } from "../../types.ts";
import * as S from "./input.style.ts";

interface InputProps {
  inputLabel: string;
  inputOption?: InputOption;
  disabled?: boolean;
  type?: InputType;
  inputSize?: ElementSize;
  defaultValue?: string | number;
  placeHolder?: string;
}

const Input = ({
  inputSize,
  inputLabel,
  disabled = false,
  type = "text",
  inputOption,
  defaultValue = "",
  placeHolder = "",
}: InputProps) => {
  return (
    <S.InputWrapper>
      <S.Label htmlFor={inputLabel}>{inputLabel}</S.Label>
      <S.Input
        type={type}
        id={inputLabel}
        className={`${inputSize} ${inputOption}`}
        disabled={disabled}
        defaultValue={defaultValue}
        placeholder={placeHolder}
      />
    </S.InputWrapper>
  );
};

export default Input;
