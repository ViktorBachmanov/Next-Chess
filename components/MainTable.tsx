import React from "react";
import { RootState } from "../app/store";
import { connect, ConnectedProps } from "react-redux";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import Radio from "@mui/material/Radio";
import { setOrder as setOrderAction } from "../features/filter/filterSlice";
import { MainTableRow, Order } from "../features/filter/types";
import styles from "../styles/MainTable.module.css";

import { styled } from "@mui/material/styles";

const MyTd = styled("td")(
  ({ theme }) => `
  background: ${theme.palette.background.default};
`
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

  return (
    <table className={`${styles.MainTable} ${isFixed && styles.fixed}`}>
      <thead>
        <tr>
          <th>№</th>
          <th>ФИО</th>
          {mainTable.map((row: MainTableRow, rowNo: number) => {
            return <th key={row.userId}>{rowNo + 1}</th>;
          })}
          <th>
            Очки
            <Radio
              checked={orderBy === Order.SCORE}
              onChange={handleChangeOrder}
              value={Order.SCORE}
              name="orderBy"
              size="small"
            />
          </th>
          <th>Игры</th>
          <th>
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
              <td className={styles.rowNo}>{rowNo + 1}</td>
              <MyTd className={styles.userName}>{row.userName}</MyTd>
              {row.cells.map((cell: number, colNo: number) => {
                const key = row.userName + colNo;
                return rowNo === colNo ? (
                  <td
                    key={key}
                    className={`${styles.self} ${isFixed && styles.hidden}`}
                  ></td>
                ) : (
                  <td key={key} className={`${isFixed && styles.hidden}`}>
                    {cell}
                  </td>
                );
              })}
              <td>{row.score}</td>
              <td>{row.games}</td>
              <td></td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default connector(MainTable);
