import React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Select from "@mui/material/Select";
import IconKing from "./IconKing";
import { User } from "../mobx/tables/types";

type Props = {
  label: string;
  users: Array<User>;
  onChange?: (value: any) => void;
  disabled: boolean;
  defaultValue: string | number;
  error?: any;
  color: string;
  transform: string | null;
};

const SelectGamer = React.forwardRef(function SelectGamer(props: Props, ref) {
  const users = [...props.users];

  users.sort((a, b) => {
    if (a.name < b.name) {
      return -1;
    } else if (a.name > b.name) {
      return 1;
    }
    return 0;
  });

  const errorMessage = props.error?.message || "Выберите игрока";

  return (
    <div style={{ display: "flex" }}>
      <IconKing color={props.color} transform={props.transform} />

      <FormControl
        style={{
          width: "12rem",
          margin: "1rem 0",
        }}
        error={Boolean(props.error)}
      >
        <InputLabel>{props.label}</InputLabel>
        <Select
          label={props.label}
          ref={ref}
          onChange={props.onChange}
          disabled={props.disabled}
          defaultValue={props.defaultValue}
        >
          {users.map((user) => (
            <MenuItem key={user.id} value={user.id}>
              {user.name}
            </MenuItem>
          ))}
        </Select>

        {props.error && <FormHelperText>{errorMessage}</FormHelperText>}
      </FormControl>
    </div>
  );
});

export default SelectGamer;
