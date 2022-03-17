import React, { useContext } from "react";

import { GamesTableRow } from "../mobx/tables/types";

import { LightStatus } from "../mobx/theme/types";

import { observer } from "mobx-react-lite";
import { StoreContext } from "../pages/index";

const GamesTable = observer(function GamesTable() {
  //console.log("GamesTable");

  const rootStore = useContext(StoreContext);
  const tables = rootStore.tables;
  const gamesTableObject = tables.gamesTable;
  const gamesTable = gamesTableObject.getRows();
  const day = tables.day;

  const lightMode = rootStore.theme.lightStatus;

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
});

export default GamesTable;

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
