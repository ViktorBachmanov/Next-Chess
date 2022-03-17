import React, { useContext } from "react";

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
//import FormHelperText from "@mui/material/FormHelperText";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import { observer } from "mobx-react-lite";
import { StoreContext } from "../pages/index";

const SelectDay = observer(function SelectDay() {
  const label = "Игровой день";

  const rootStore = useContext(StoreContext);
  const tables = rootStore.tables;
  const allGames = tables.allGames;

  const handleChange = (e: SelectChangeEvent<string>) => {
    tables.setDay(e.target.value);
  };

  const days = getDistinctDays(allGames);

  return (
    <Box style={{ width: "9rem", margin: "2rem auto" }}>
      <FormControl fullWidth>
        <InputLabel>{label}</InputLabel>
        <Select label={label} onChange={handleChange} defaultValue="all">
          <MenuItem value="all">Все</MenuItem>
          {days.map((day) => (
            <MenuItem key={day} value={day}>
              {new Date(day).toLocaleDateString("ru-RU")}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
});

export default SelectDay;

// helper functions

function getDistinctDays(games: Array<any>): Array<string> {
  const dayArray = games.map((game) => game.date);

  return [...new Set(dayArray)];
}
