import React, { ChangeEvent, useState } from "react";
import Box from "@mui/material/Box";
import { Checkbox, FormControlLabel } from "@mui/material";

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
    <Box sx={{ minWidth: 120 }}>
      <FormControlLabel
        label={label}
        control={
          <Checkbox
            checked={checkedItem}
            disabled={isDisabled}
            onChange={handleChange}
            color="success"
            size="medium"
          />
        }
      />
    </Box>
  );
};

export default CheckboxComponent;
