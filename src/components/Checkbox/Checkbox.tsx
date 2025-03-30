import React, { ChangeEvent, useState } from "react";
import Box from "@mui/material/Box";
import { Checkbox, FormControlLabel } from "@mui/material";
import * as S from "./checkbox.style.ts";

interface CheckboxProps {
  isDisabled: boolean;
  isChecked: boolean;
  label: string;
  setCheckedVal: (val: boolean) => void;
}

const CheckboxComponent = ({
  isDisabled,
  isChecked,
  label,
  setCheckedVal,
}: CheckboxProps) => {
  const [checkedItem, setCheckedItem] = useState<boolean>(isChecked);

  const handleChange = (val: ChangeEvent<HTMLInputElement>) => {
    setCheckedVal(val.target.checked);
    setCheckedItem(val.target.checked);
  };

  return (
    <S.Wrapper>
      <FormControlLabel
        label={label}
        control={
          <Checkbox
            checked={checkedItem}
            disabled={isDisabled}
            onChange={handleChange}
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
