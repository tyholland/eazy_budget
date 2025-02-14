import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { AutoCompleteOptions } from "../../types.ts";

interface AutoCompleteProps {
  options: AutoCompleteOptions[];
  placeHolder: string;
}

const AutoComplete = ({ options, placeHolder }: AutoCompleteProps) => {
  return (
    <Autocomplete
      disablePortal
      options={options}
      sx={{ width: 200 }}
      renderInput={(params) => <TextField {...params} label={placeHolder} />}
    />
  );
};

export default AutoComplete;
