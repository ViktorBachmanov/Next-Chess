import React from "react";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import Brightness4OutlinedIcon from "@mui/icons-material/Brightness4Outlined";
import IconButton from "@mui/material/IconButton";

import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../app/store";

import { LightStatus } from "./types";
import { setLightStatus as setLightStatusAction } from "./themeSlice";

function mapStateToProps(state: RootState) {
  return {
    lightMode: state.theme.lightStatus,
  };
}

const mapDispatchToProps = {
  setLightMode: setLightStatusAction,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function LightMode(props: PropsFromRedux) {
  const { lightMode, setLightMode } = props;

  return (
    <IconButton
      size="large"
      edge="end"
      color="inherit"
      aria-label="menu"
      onClick={
        lightMode === LightStatus.DARK
          ? () => setLightMode(LightStatus.LIGHT)
          : () => setLightMode(LightStatus.DARK)
      }
    >
      {lightMode === LightStatus.DARK ? (
        <LightModeOutlinedIcon />
      ) : (
        <Brightness4OutlinedIcon />
      )}
    </IconButton>
  );
}

export default connector(LightMode);
