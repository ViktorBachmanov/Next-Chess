import React, { useContext, useEffect } from "react";

import Radio from "@mui/material/Radio";
import { MainTableRow, Order } from "../mobx/tables/types";
import styles from "../styles/MainTable.module.css";

import { styled } from "@mui/material/styles";

import { StoreContext } from "./Layout";
import { observer } from "mobx-react-lite";

const OpaqueTh = styled("th")(
  ({ theme }) => `
  background: ${theme.palette.background.paper};
  background-image: linear-gradient(rgba(255, 255, 255, 0.09), rgba(255, 255, 255, 0.09));`
);

const OpaqueTd = styled("td")(
  ({ theme }) => `
  background: ${theme.palette.background.paper};
  background-image: linear-gradient(rgba(255, 255, 255, 0.09), rgba(255, 255, 255, 0.09));`
);

const selfLightBg = `linear-gradient(
  170deg,
  rgb(245, 245, 255) 0%,
  rgb(235, 240, 245) 55%,
  rgb(205, 215, 225) 100%
);`;

const selfDarkBg = `linear-gradient(
  170deg,
  rgb(45, 45, 55) 0%,
  rgb(35, 40, 45) 55%,
  rgb(5, 15, 25) 100%
);`;

const SelfTd = styled("td")(
  ({ theme }) => `
  background: ${theme.palette.mode === "light" ? selfLightBg : selfDarkBg}`
);

interface Props {
  isFixed: boolean;
  //initialMainTable: MainTableRow[];
}

const MainTable = observer(function MainTable(props: Props) {
  //const { isFixed, initialMainTable } = props;
  const { isFixed } = props;

  console.log("MainTable");

  const rootStore = useContext(StoreContext);
  //const tables = rootStore.tables;

  //console.log("rootStore: ", rootStore);

  let mainTable: MainTableRow[] | null | undefined;
  //mainTable = rootStore.tables?.mainTable || initialMainTable;
  mainTable = rootStore.tables?.mainTable;
  if (!mainTable) {
    return null;
  }
  //console.log("useEffect tables?.mainTable", rootStore.tables?.mainTable);
  //console.log("useEffect initialMainTable", initialMainTable);
  //console.log("useEffect mainTable", mainTable);

  const handleChangeOrder = (e: React.ChangeEvent<HTMLInputElement>) => {
    const orderBy = parseInt(e.target.value) as Order;
    rootStore.tables!.setOrderBy(orderBy);
  };

  const visibility = isFixed ? styles.hidden : "";

  return (
    <table className={`${styles.MainTable} ${isFixed && styles.fixed}`}>
      <thead>
        <tr style={{ boxShadow: "inset 0px 2px 2px gray" }}>
          <OpaqueTh style={{ boxShadow: "none" }}>№</OpaqueTh>
          <OpaqueTh style={{ boxShadow: "grey 2px 2px 2px" }}>ФИО</OpaqueTh>

          {mainTable.map((row: MainTableRow, rowNo: number) => {
            return (
              <th key={row.userId} className={visibility}>
                {rowNo + 1}
              </th>
            );
          })}
          <th className={visibility}>
            Очки
            <Radio
              checked={rootStore.tables?.orderBy === Order.SCORE}
              onChange={handleChangeOrder}
              value={Order.SCORE}
              name="orderBy"
              size="small"
            />
          </th>
          <th className={visibility}>Игры</th>
          <th className={visibility}>
            Рейтинг
            <Radio
              checked={rootStore.tables?.orderBy === Order.RATING}
              onChange={handleChangeOrder}
              value={Order.RATING}
              name="orderBy"
              size="small"
            />
          </th>
        </tr>
      </thead>

      <tbody>
        {mainTable.map((row: MainTableRow, rowNo: number) => {
          return (
            <tr key={row.userId}>
              <OpaqueTd>{rowNo + 1}</OpaqueTd>
              <OpaqueTd className={styles.userName}>{row.userName}</OpaqueTd>
              {row.cells.map((cell: number, colNo: number) => {
                const key = row.userName + colNo;
                return rowNo === colNo ? (
                  <SelfTd key={key} className={`${styles.self} ${visibility}`}>
                    {renderPrizePlace(rowNo)}
                  </SelfTd>
                ) : (
                  <td key={key} className={visibility}>
                    {cell}
                  </td>
                );
              })}
              <td className={visibility}>{row.score}</td>
              <td className={visibility}>{row.games}</td>
              <td className={visibility}>{row.rating}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
});

export default MainTable;

// helper functions

function renderPrizePlace(place: number) {
  switch (place) {
    case 0:
      return <div className={styles.crown}></div>;
    //return <div className={`${styles.medal} ${styles.gold}`}>I</div>;
    case 1:
      return <div className={`${styles.medal} ${styles.silver}`}>II</div>;
    case 2:
      return <div className={`${styles.medal} ${styles.bronze}`}>III</div>;
    case 3:
      return <div className={`${styles.medal} ${styles.wood}`}>IV</div>;

    default:
      return null;
  }
}
