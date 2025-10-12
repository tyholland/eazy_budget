import React, { ChangeEvent, useEffect, useState } from "react";
import { ElementSize, InputOption, InputType } from "../../types.ts";
import * as S from "./budgetInput.style.ts";
import {
  formatAmount,
  getFormattedCurrency,
  revertAmountToOriginal,
} from "../../functions/helper.ts";
import { useParams } from "react-router-dom";
import { useAtomValue } from "jotai";
import { userAtom } from "../../hook/UserAtom.ts";

interface BudgetInputProps {
  inputLabel: string;
  isEditable?: boolean;
  setInputValue?: (val: number | string) => void;
  setUpdatedLabel?: (val: string) => void;
  setChangeInputVal?: (val: boolean) => void;
  inputOption?: InputOption;
  type?: InputType;
  inputSize?: ElementSize;
  defaultValue?: string | number;
  valuePlaceHolder?: string;
  labelPlaceHolder?: string;
  percent?: boolean;
  frequency?: string;
}

const BudgetInput = ({
  inputSize = "small",
  inputLabel,
  isEditable = false,
  type = "text",
  inputOption = "default",
  defaultValue = "",
  valuePlaceHolder = "",
  labelPlaceHolder = "",
  setInputValue = () => {},
  setUpdatedLabel = () => {},
  setChangeInputVal = () => {},
  percent = false,
  frequency = "Monthly",
}: BudgetInputProps) => {
  const { month, year } = useParams();
  const currentUser = useAtomValue(userAtom);
  const [inputVal, setInputVal] = useState<string>("");

  const handleLabelOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUpdatedLabel(e.target.value);
    setInputValue(defaultValue);
    setChangeInputVal(true);
  };

  const handleValueOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setUpdatedLabel(inputLabel);
    setChangeInputVal(true);
  };

  const getInputAmount = async () => {
    const { currencyValue } = await getFormattedCurrency(
      Number(defaultValue),
      currentUser,
    );

    setInputVal(currencyValue);
  };

  useEffect(() => {
    getInputAmount();
  }, []);

  return (
    <S.InputWrapper className="inputWrapper">
      {isEditable && (
        <>
          <S.Input
            type="text"
            className={`${inputSize} ${inputOption}`}
            value={inputLabel}
            onChange={handleLabelOnChange}
            placeholder={labelPlaceHolder}
          />
          <S.Input
            type={type}
            className={`${inputSize} ${inputOption}`}
            onChange={handleValueOnChange}
            value={
              typeof defaultValue === "number"
                ? revertAmountToOriginal(defaultValue, month, year, frequency)
                : defaultValue
            }
            placeholder={valuePlaceHolder}
          />
        </>
      )}

      {!isEditable && (
        <>
          <S.Label aria-label={inputLabel} htmlFor={inputLabel}>
            {inputLabel}
          </S.Label>
          <S.Input
            type={"text"}
            id={inputLabel}
            className={`${inputSize} ${inputOption}`}
            disabled
            value={percent ? `${defaultValue}%` : inputVal}
            aria-label={`${inputLabel} value`}
          />
        </>
      )}
    </S.InputWrapper>
  );
};

export default BudgetInput;
