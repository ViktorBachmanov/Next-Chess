import React from "react";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import Radio from "@mui/material/Radio";
import { MainTableRow, Order } from "../features/filter/types";

interface Props {
  //users: Array<any>;
  //games: Array<any>;
  mainTable: Array<MainTableRow>;
  orderBy: Order;
  setOrder: ActionCreatorWithPayload<Order>;
}

export default function MainTable(props: Props) {
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

// helper functions
