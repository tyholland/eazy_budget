import React from "react";
import { InputSize, InputOptions, InputTypes } from "../../types.ts";
import * as S from "./input.style.ts";

interface InputProps {
  inputLabel: string;
  inputOption?: InputOptions;
  disabled?: boolean;
  type?: InputTypes;
  inputSize?: InputSize;
}

const Input = ({
  inputSize = "small",
  inputLabel,
  disabled = false,
  type = "text",
  inputOption,
}: InputProps) => {
  return (
    <S.InputWrapper>
      <S.Label htmlFor={inputLabel}>{inputLabel}</S.Label>
      <S.Input
        type={type}
        id={inputLabel}
        className={`${inputSize} ${inputOption}`}
        disabled={disabled}
        defaultValue={30}
      />
    </S.InputWrapper>
  );
};

export default Input;
