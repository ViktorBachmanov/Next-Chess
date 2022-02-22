import React from "react";
import { RootState } from "../app/store";
import { connect, ConnectedProps } from "react-redux";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import Radio from "@mui/material/Radio";
import { setOrder as setOrderAction } from "../features/filter/filterSlice";
import { MainTableRow, Order } from "../features/filter/types";

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

function MainTable(props: PropsFromRedux) {
  const { mainTable, orderBy, setOrder } = props;

  const handleChangeOrder = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOrder(parseInt(e.target.value));
  };

  return (
    <table>
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
        {/*users.map((user, index) => {
          return (
            <tr key={user.id}>
              <td>{index + 1}</td>
              <td style={{ whiteSpace: "nowrap" }}>{user.name}</td>
              {users.map((user) => {
                return <td key={user.id}></td>;
              })}
            </tr>
          );
        })*/}
        {mainTable.map((row: MainTableRow, rowNo: number) => {
          return (
            <tr key={row.userId}>
              <td>{rowNo + 1}</td>
              <td style={{ whiteSpace: "nowrap" }}>{row.userName}</td>
              {row.cells.map((cell: number, colNo: number) => {
                return <td key={row.userName + colNo}>{cell}</td>;
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
