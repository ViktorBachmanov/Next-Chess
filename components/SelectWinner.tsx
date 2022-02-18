import React, { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Select, { SelectChangeEvent } from "@mui/material/Select";

export enum Won {
  WHITE,
  BLACK,
  DRAW,
}

type Props = {
  label: string;
  defaultValue: string | number;
  users: Array<any>;
  disabled: boolean;
  onChange?: (value: any) => void;
  error?: any;
};

const SelectWinner = React.forwardRef(function SelectWinner(props: Props, ref) {
  //const [gamerId, setGamer] = useState('');
  /*
    function handleChange(event: SelectChangeEvent) {
        setGamer(event.target.value);
    }*/

  return (
    <FormControl
      style={{ marginTop: "2rem", width: "12rem" }}
      error={Boolean(props.error)}
    >
      <InputLabel>{props.label}</InputLabel>
      <Select
        label={props.label}
        defaultValue={props.defaultValue}
        disabled={props.disabled}
        ref={ref}
        onChange={props.onChange}
      >
        <MenuItem value={Won.WHITE}>Белые</MenuItem>
        <MenuItem value={Won.BLACK}>Чёрные</MenuItem>
        <MenuItem value={Won.DRAW}>Ничья</MenuItem>
      </Select>

      {props.error && <FormHelperText>Выберите результат</FormHelperText>}
    </FormControl>
  );
});

export default SelectWinner;
