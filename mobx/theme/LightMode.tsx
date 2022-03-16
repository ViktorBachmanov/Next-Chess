import React, { useContext } from "react";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import Brightness4OutlinedIcon from "@mui/icons-material/Brightness4Outlined";
import IconButton from "@mui/material/IconButton";

// import { connect, ConnectedProps } from "react-redux";
// import { RootState } from "../../app/store";

import { LightStatus } from "./types";
//import { setLightStatus as setLightStatusAction } from "./themeSlice";

import { StoreContext } from "../../pages/index";
import { observer } from "mobx-react-lite";

// function mapStateToProps(state: RootState) {
//   return {
//     lightMode: state.theme.lightStatus,
//   };
// }

// const mapDispatchToProps = {
//   setLightMode: setLightStatusAction,
// };

// const connector = connect(mapStateToProps, mapDispatchToProps);

// type PropsFromRedux = ConnectedProps<typeof connector>;

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
