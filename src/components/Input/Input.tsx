import React from "react";
import { ElementSize, InputOption, InputType } from "../../types.ts";
import * as S from "./input.style.ts";

interface InputProps {
  inputLabel: string;
  inputOption?: InputOption;
  disabled?: boolean;
  type?: InputType;
  inputSize?: ElementSize;
}

const Input = ({
  inputSize,
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
