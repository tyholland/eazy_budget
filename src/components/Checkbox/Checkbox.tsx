import React, { ChangeEvent, useEffect, useState } from "react";
import { Checkbox, FormControlLabel } from "@mui/material";
import * as S from "./checkbox.style.ts";
import { UseFormRegister } from "react-hook-form";

interface CheckboxProps {
  isDisabled: boolean;
  isChecked: boolean;
  label: string;
  setCheckedVal: (val: boolean) => void;
  register?: UseFormRegister<any>;
}

const CheckboxComponent = ({
  isDisabled,
  isChecked,
  label,
  setCheckedVal,
  register,
}: CheckboxProps) => {
  const [checkedItem, setCheckedItem] = useState<boolean>(isChecked);
  const requiredDetails = register ? { ...register("paidCheckbox") } : {};

  const handleChange = (val: ChangeEvent<HTMLInputElement>) => {
    setCheckedVal(val.target.checked);
    setCheckedItem(val.target.checked);
  };

  useEffect(() => {
    setCheckedItem(isChecked);
  }, [isChecked]);

  return (
    <S.Wrapper>
      <FormControlLabel
        label={label}
        control={
          <Checkbox
            checked={checkedItem}
            disabled={isDisabled}
            onChange={handleChange}
            {...requiredDetails}
            color="success"
            size="medium"
            aria-label={`${label} checkbox`}
          />
        }
      />
    </S.Wrapper>
  );
};

export default CheckboxComponent;
