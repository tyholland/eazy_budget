import React, { ChangeEvent, HTMLElementType, useState } from "react";
import { ElementSize, InputOption, InputType } from "../../types.ts";
import * as S from "./input.style.ts";
import { formatAmount } from "../../functions/helper.ts";

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
      {editableLabel ? (
        <S.Input
          type="text"
          className={`${inputSize} ${inputOption}`}
          value={updatedLabel}
          onChange={handleLabelOnChange}
          placeholder={labelPlaceHolder}
        />
      ) : (
        <S.Label htmlFor={updatedLabel}>{updatedLabel}</S.Label>
      )}
      <S.Input
        type={editableValue ? type : "text"}
        id={updatedLabel}
        className={`${inputSize} ${inputOption}`}
        disabled={!editableValue}
        onChange={handleValueOnChange}
        value={!editableValue ? formatAmount(Number(inputValue)) : inputValue}
        placeholder={valuePlaceHolder}
      />
    </S.InputWrapper>
  );
};

export default Input;
