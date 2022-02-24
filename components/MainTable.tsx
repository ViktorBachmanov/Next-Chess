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

const OpaqueTh = styled("td")(
  ({ theme }) => `
  background: ${theme.palette.background.default};`
);

const OpaqueTd = styled("td")(
  ({ theme }) => `
  background: ${theme.palette.background.default};`
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
          <OpaqueTh>№</OpaqueTh>
          <OpaqueTh>ФИО</OpaqueTh>

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
                  <td key={key} className={`${styles.self} ${visibility}`}></td>
                ) : (
                  <td key={key} className={visibility}>
                    {cell}
                  </td>
                );
              })}
              <td className={visibility}>{row.score}</td>
              <td className={visibility}>{row.games}</td>
              <td className={visibility}></td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default connector(MainTable);
