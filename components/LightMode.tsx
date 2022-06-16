import React, { useContext } from "react";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import Brightness4OutlinedIcon from "@mui/icons-material/Brightness4Outlined";
import IconButton from "@mui/material/IconButton";

import { LightStatus } from "../mobx/theme/types";

import { StoreContext } from "./Layout";
import { observer } from "mobx-react-lite";

const LightMode = observer(function LightMode() {
  const rootStore = useContext(StoreContext);
  const themeStore = rootStore.theme;
  const lightMode = themeStore.lightStatus;

  const handleClick = () => {
    //console.log("LightMode handleClick LightStatus: ", lightMode);
    if (lightMode === LightStatus.DARK) {
      themeStore.setLightStatus(LightStatus.LIGHT);
    } else {
      themeStore.setLightStatus(LightStatus.DARK);
    }
  };

  return (
    <IconButton
      size="large"
      edge="end"
      color="inherit"
      aria-label="menu"
      onClick={handleClick}
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
