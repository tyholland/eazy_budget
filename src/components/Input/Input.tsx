import React from "react";
import { ElementSize, InputOption, InputType } from "../../types.ts";
import * as S from "./input.style.ts";

interface InputProps {
  inputLabel: string;
  inputOption?: InputOption;
  editableValue?: boolean;
  editableLabel?: boolean;
  type?: InputType;
  inputSize?: ElementSize;
  defaultValue?: string | number;
  valuePlaceHolder?: string;
  labelPlaceHolder?: string;
}

const Input = ({
  inputSize = "small",
  inputLabel,
  editableValue = false,
  editableLabel = false,
  type = "text",
  inputOption = "default",
  defaultValue = "",
  valuePlaceHolder = "",
  labelPlaceHolder = "",
}: InputProps) => {
  return (
    <S.InputWrapper>
      {editableLabel ? (
        <S.Input
          type="text"
          className={`${inputSize} ${inputOption}`}
          defaultValue={inputLabel}
          placeholder={labelPlaceHolder}
        />
      ) : (
        <S.Label htmlFor={inputLabel}>{inputLabel}</S.Label>
      )}
      <S.Input
        type={type}
        id={inputLabel}
        className={`${inputSize} ${inputOption}`}
        disabled={editableValue}
        defaultValue={defaultValue}
        placeholder={valuePlaceHolder}
      />
    </S.InputWrapper>
  );
};

export default Input;
