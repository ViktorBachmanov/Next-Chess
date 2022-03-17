import React, { useContext } from "react";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import Brightness4OutlinedIcon from "@mui/icons-material/Brightness4Outlined";
import IconButton from "@mui/material/IconButton";

import { LightStatus } from "../mobx/theme/types";

import { StoreContext } from "../pages/index";
import { observer } from "mobx-react-lite";

const LightMode = observer(function LightMode() {
  const rootStore = useContext(StoreContext);
  const themeStore = rootStore.theme;
  const lightMode = themeStore.lightStatus;

  return (
    <IconButton
      size="large"
      edge="end"
      color="inherit"
      aria-label="menu"
      onClick={
        lightMode === LightStatus.DARK
          ? () => themeStore.setLightStatus(LightStatus.LIGHT)
          : () => themeStore.setLightStatus(LightStatus.DARK)
      }
    >
      {lightMode === LightStatus.DARK ? (
        <LightModeOutlinedIcon />
      ) : (
        <Brightness4OutlinedIcon />
      )}
    </IconButton>
  );
});

export default LightMode;
