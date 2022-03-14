import React from "react";
import { RootState } from "../app/store";
import { useAppSelector } from "../app/hooks";

import { GamesTableRow } from "../features/filter/types";
import { gamesTableObject } from "../features/filter/filterSlice";

import { LightStatus } from "../features/theme/types";

export default function GamesTable() {
  console.log("GamesTable");

  const gamesTable = useAppSelector(
    (state: RootState) => state.filter.gamesTable
  );

  const lightMode = useAppSelector(
    (state: RootState) => state.theme.lightStatus
  );

  return (
    <table style={{ margin: "2rem 0" }}>
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
              <td style={getCellBgStyle(row.whiteId, row.winnerId, lightMode)}>
                {gamesTableObject.getUserNameById(row.whiteId)}
              </td>
              <td>{new Date(row.day).toLocaleDateString("ru-RU")}</td>
              <td style={getCellBgStyle(row.blackId, row.winnerId, lightMode)}>
                {gamesTableObject.getUserNameById(row.blackId)}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

// helper functions

function getCellBgStyle(
  userId: number,
  winnerId: number | null,
  lightMode: LightStatus
) {
  if (winnerId === null) {
    return {};
  }

  if (winnerId === userId) {
    switch (lightMode) {
      case LightStatus.LIGHT:
        return { background: "#b2dfdb" };

      case LightStatus.DARK:
        return { background: "#00695c" };
    }
  } else {
    switch (lightMode) {
      case LightStatus.LIGHT:
        return { background: "#ffcdd2" };

      case LightStatus.DARK:
        return { background: "#c51162" };
    }
  }
}
