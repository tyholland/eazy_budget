import React, { useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { SelectOptions } from "../../types.ts";
import * as S from "./select.style.ts";
import { MenuItem } from "@mui/material";
import { WHITE } from "../../index.style.ts";

interface SelectProps {
  options: SelectOptions[];
  placeHolder: string;
  defaultValue: string;
  setOption: (val: string) => void;
}

const SelectComponent = ({
  options,
  placeHolder,
  defaultValue,
  setOption,
}: SelectProps) => {
  const [selectedItem, setSelectedItem] = useState<string>(defaultValue);

  const handleChange = (val: SelectChangeEvent) => {
    setOption(val.target.value);
    setSelectedItem(val.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <InputLabel
        sx={{ fontWeight: 500 }}
        aria-label={placeHolder}
        id="select-label"
      >
        {placeHolder}
      </InputLabel>
      <Select
        label={placeHolder}
        value={selectedItem}
        onChange={handleChange}
        size="small"
        sx={{ backgroundColor: WHITE }}
        aria-label={`${placeHolder} options`}
      >
        {options.map((item: SelectOptions) => (
          <MenuItem aria-label={item.label} key={item.id} value={item.label}>
            <S.SelectedOption>{item.label}</S.SelectedOption>
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
};

export default SelectComponent;
