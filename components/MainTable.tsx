import React from "react";

interface Props {
  users: Array<any>;
  games: Array<any>;
}

export default function MainTable(props: Props) {
  const { users, games } = props;

  return (
    <table>
      <thead>
        <tr>
          <th>№</th>
          <th>ФИО</th>
          {users.map((user, index) => {
            return <th key={user.id}>{index + 1}</th>;
          })}
        </tr>
      </thead>

      <tbody>
        {users.map((user, index) => {
          return (
            <tr key={user.id}>
              <td>{index + 1}</td>
              <td style={{ whiteSpace: "nowrap" }}>{user.name}</td>
              {users.map((user) => {
                return <td key={user.id}></td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
