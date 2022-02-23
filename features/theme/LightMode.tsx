import React, { useState, useEffect } from "react";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import Brightness4OutlinedIcon from "@mui/icons-material/Brightness4Outlined";

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
    <div style={{ cursor: "pointer" }}>
      {lightMode === LightStatus.DARK ? (
        <LightModeOutlinedIcon
          onClick={() => setLightMode(LightStatus.LIGHT)}
        />
      ) : (
        <Brightness4OutlinedIcon
          onClick={() => setLightMode(LightStatus.DARK)}
        />
      )}
    </div>
  );
}

export default connector(LightMode);
