/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */

import React from "react";
import { RootState } from "../app/store";
import { useAppSelector } from "../app/hooks";

//import { connect, ConnectedProps } from "react-redux";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import Radio from "@mui/material/Radio";
import { css } from "@emotion/react";
import { setOrder as setOrderAction } from "../features/filter/filterSlice";
import { GamesTableRow } from "../features/filter/types";
import { gamesTableObject } from "../features/filter/filterSlice";
import styles from "../styles/MainTable.module.css";

import { styled, useTheme } from "@mui/material/styles";

export default function GamesTable() {
  const gamesTable = useAppSelector(
    (state: RootState) => state.filter.gamesTable
  );

  return (
    <table>
      <thead>
        <tr>
          <th>Белые</th>
          <th>Дата</th>
          <th>Чёрные</th>
        </tr>
      </thead>

      <tbody>
        {gamesTable.map((row: GamesTableRow, rowNo: number) => {
          return (
            <tr key={rowNo}>
              <td>{gamesTableObject.getUserNameById(row.whiteId)}</td>
              <td>{new Date(row.day).toLocaleDateString("ru-RU")}</td>
              <td>{gamesTableObject.getUserNameById(row.blackId)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

// helper functions
