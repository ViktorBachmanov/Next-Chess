import React, { useState, useEffect } from "react";
import LightModeIcon from "@mui/icons-material/LightMode";
import Brightness4Icon from "@mui/icons-material/Brightness4";

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
        <LightModeIcon onClick={() => setLightMode(LightStatus.LIGHT)} />
      ) : (
        <Brightness4Icon onClick={() => setLightMode(LightStatus.DARK)} />
      )}
    </div>
  );
}

export default connector(LightMode);
