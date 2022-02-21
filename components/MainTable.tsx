import React from "react";
import { MainTableRow } from "../features/filter/MainTable";

interface Props {
  users: Array<any>;
  games: Array<any>;
  mainTable: Array<MainTableRow>;
}

export default function MainTable(props: Props) {
  const { users, games, mainTable } = props;

  return (
    <table>
      <thead>
        <tr>
          <th>№</th>
          <th>ФИО</th>
          {mainTable.map((row: MainTableRow, rowNo: number) => {
            return <th key={row.userId}>{rowNo + 1}</th>;
          })}
          <th>Очки</th>
          <th>Игры</th>
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
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

// helper functions
