import React from "react";

interface Props {
  users: Array<any>;
  games: Array<any>;
  mainTable: any;
}

export default function MainTable(props: Props) {
  const { users, games, mainTable } = props;

  return (
    <table>
      <thead>
        <tr>
          <th>№</th>
          <th>ФИО</th>
          {mainTable.map((row: any, rowNo: number) => {
            return <th key={row.name}>{rowNo + 1}</th>;
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
        {mainTable.map((row: any, rowNo: number, table: any) => {
          return (
            <tr key={row.name}>
              <td>{rowNo + 1}</td>
              <td style={{ whiteSpace: "nowrap" }}>{row.name}</td>
              {row.map((col: any, colNo: number) => {
                return <td key={row.name + colNo}>{table[rowNo][colNo]}</td>;
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
