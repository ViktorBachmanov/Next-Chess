import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import MenuChess from "./MenuChess";

import LightMode from "../features/theme/LightMode";

export default function AppBarChess() {
  return (
    <AppBar position="static">
      <Toolbar>
        <MenuChess />

        <Typography
          align="center"
          variant="h6"
          component="div"
          sx={{ flexGrow: 1 }}
        >
          Шахматный клуб
        </Typography>

        <LightMode />
      </Toolbar>
    </AppBar>
  );
}
