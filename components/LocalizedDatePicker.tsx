import React from "react";
import ruLocale from "date-fns/locale/ru";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DatePicker from "@mui/lab/DatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

interface Props {
  disabled: boolean;
  error?: any;
  onChange?: (value: any) => void;
  value: Date;
}

const LocalizedDatePicker = React.forwardRef(function LocalizedDatePicker(
  props: Props,
  ref
) {
  //const [value, setValue] = React.useState<Date | null>(new Date());

  console.log("LocalizedDatePicker props.value: ", props.value);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} locale={ruLocale}>
      <div>
        <DatePicker
          mask={"__.__.____"}
          value={props.value}
          onChange={(newValue) => props.onChange!(newValue)}
          inputRef={() => ref}
          renderInput={(params) => <TextField {...params} />}
          disabled={props.disabled}
        />
      </div>
    </LocalizationProvider>
  );
});

export default LocalizedDatePicker;
