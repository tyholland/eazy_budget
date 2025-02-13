import React from "react";
import { ButtonSize, InputOptions, InputTypes } from "../../types.ts";
import * as S from "./input.style.ts";

interface InputProps {
  inputLabel: string;
  inputOption?: InputOptions;
  disabled?: boolean;
  type?: InputTypes;
  buttonSize?: ButtonSize;
}

const Input = ({
  buttonSize = "small",
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
        className={`${buttonSize} ${inputOption}`}
        disabled={disabled}
        defaultValue={30}
      />
    </S.InputWrapper>
  );
};

export default Input;
