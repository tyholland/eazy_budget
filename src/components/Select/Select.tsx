import React, { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { SelectOptions } from "../../types.ts";

interface SelectProps {
  options: SelectOptions[];
  placeHolder: string;
  defaultValue: string;
  setView?: (val: string) => void;
}

const SelectComponent = ({
  options,
  placeHolder,
  defaultValue,
  setView,
}: SelectProps) => {
  const [selectedItem, setSelectedItem] = useState<string>(defaultValue);

  const handleChange = (val: SelectChangeEvent) => {
    setView && setView(val.target.value);
    setSelectedItem(val.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <InputLabel id="demo-simple-select-label">{placeHolder}</InputLabel>
      <Select label={placeHolder} value={selectedItem} onChange={handleChange}>
        {options.map((item) => (
          <MenuItem key={item.id} value={item.label}>
            {item.label}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
};

export default SelectComponent;
