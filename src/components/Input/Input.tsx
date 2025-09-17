import React, { ChangeEvent } from "react";
import * as S from "./input.style.ts";

interface InputProps {
  label: string;
  labelValue: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeHolder: string;
  onClick?: () => void;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  defaultValue?: string;
  inputType?: string;
}

const Input = ({
  label,
  labelValue,
  onChange,
  onClick = () => {},
  placeHolder,
  isDisabled,
  isReadOnly = false,
  defaultValue,
  inputType = "number",
}: InputProps) => {
  return (
    <S.InputWrapper>
      <S.Label htmlFor={label}>{labelValue}</S.Label>
      <S.Input
        id={label}
        type={inputType}
        className={inputType}
        placeholder={placeHolder}
        onChange={onChange}
        disabled={isDisabled}
        value={defaultValue}
        readOnly={isReadOnly}
        onClick={onClick}
      />
    </S.InputWrapper>
  );
};

export default Input;
