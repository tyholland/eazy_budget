import React from "react";
import { ButtonSize, InputTypes } from "../../types.ts";
import * as S from "./input.style.ts";

interface InputProps {
  buttonSize?: ButtonSize;
  inputLabel: string;
  editable?: boolean;
  type?: InputTypes;
}

const Input = ({
  buttonSize = "small",
  inputLabel,
  editable,
  type = "text",
}: InputProps) => {
  return (
    <S.InputWrapper>
      <S.Label htmlFor={inputLabel}>{inputLabel}</S.Label>
      <S.Input
        type={type}
        id={inputLabel}
        className={buttonSize}
        disabled={!editable}
      />
    </S.InputWrapper>
  );
};

export default Input;
