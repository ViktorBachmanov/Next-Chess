import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { RootState } from "../app/store";

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { setDayFilter } from "../features/filter/filterSlice";

function SelectDay() {
  const label = "Игровой день";

  const dispatch = useAppDispatch();

  const handleChange = (e: SelectChangeEvent<string>) => {
    dispatch(setDayFilter(e.target.value));
  };

  const allGames = useAppSelector((state: RootState) => state.db.games);

  const days = getDistinctDays(allGames);

  return (
    <Box style={{ width: "9rem" }}>
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
}

export default SelectDay;

// helper functions

function getDistinctDays(games: Array<any>): Array<string> {
  const dayArray = games.map((game) => game.day);

  return [...new Set(dayArray)];
}
