import React, { useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Select, { SelectChangeEvent } from "@mui/material/Select";

type Props = {
  days: Array<Date>;
  onChange: (value: any) => void;
};

function SelectDay(props: Props) {
  const label = "Игровой день";

  return (
    <Box>
      <FormControl>
        <InputLabel>{label}</InputLabel>
        <Select label={label} onChange={props.onChange} defaultValue="Все">
          {/*props.days.map((day, index) => (
            <MenuItem key={index} value={day}>
              {day}
            </MenuItem>
          ))*/}
        </Select>
      </FormControl>
    </Box>
  );
}

export default SelectDay;
