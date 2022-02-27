/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */

import React from "react";
import { RootState } from "../app/store";
import { connect, ConnectedProps } from "react-redux";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import Radio from "@mui/material/Radio";
import { css } from "@emotion/react";
import { setOrder as setOrderAction } from "../features/filter/filterSlice";
import { MainTableRow, Order } from "../features/filter/types";
import styles from "../styles/MainTable.module.css";

import { styled, useTheme } from "@mui/material/styles";

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

function mapStateToProps(state: RootState) {
  return {
    mainTable: state.filter.mainTable,
    orderBy: state.filter.orderBy,
  };
}

const mapDispatchToProps = {
  setOrder: setOrderAction,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux & {
  isFixed: boolean;
};

function MainTable(props: Props) {
  const { mainTable, orderBy, setOrder, isFixed } = props;

  const handleChangeOrder = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOrder(parseInt(e.target.value));
  };

  const visibility = isFixed ? styles.hidden : "";

  return (
    <table className={`${styles.MainTable} ${isFixed && styles.fixed}`}>
      <thead>
        <tr>
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
              checked={orderBy === Order.SCORE}
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
              checked={orderBy === Order.RATING}
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
                  <td key={key} className={`${styles.self} ${visibility}`}>
                    {renderPrizePlace(rowNo)}
                  </td>
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
}

export default connector(MainTable);

// helper functions

function renderPrizePlace(place: number) {
  switch (place) {
    case 0:
      return <div className={styles.crown}></div>;
    case 1:
      return <div className={`${styles.medal} ${styles.silver}`}>II</div>;
    case 2:
      return <div className={`${styles.medal} ${styles.bronze}`}>III</div>;
    case 3:
      return <div className={`${styles.medal} ${styles.wood}`}>IV</div>;

    default:
      return;
  }
}
