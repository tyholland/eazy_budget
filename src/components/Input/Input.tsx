import React, { ChangeEvent } from "react";
import * as S from "./input.style.ts";

interface InputProps {
  label: string;
  labelValue: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeHolder: string;
}

const Input = ({ label, labelValue, onChange, placeHolder }: InputProps) => {
  return (
    <S.InputWrapper>
      <S.Label htmlFor={label}>{labelValue}</S.Label>
      <S.Input
        id={label}
        type="number"
        placeholder={placeHolder}
        onChange={onChange}
      />
    </S.InputWrapper>
  );
};

export default Input;
