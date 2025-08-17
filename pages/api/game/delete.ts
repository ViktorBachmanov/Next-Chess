import { db } from "../../../lib/db";

import { NextApiRequest, NextApiResponse } from "next";
import { verifyAuthToken } from "../../../lib/utils";

import { UserData, DeleteGameData } from "../../../types";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const sendData: DeleteGameData = req.body;
  const lastGameId: number = sendData.id;
  const authToken: string = sendData.authToken;
  const whiteUser: UserData = sendData.white;
  const blackUser: UserData = sendData.black;

  const userAgent = req.headers["user-agent"];

  const isAuthTokenOk = await verifyAuthToken(authToken, userAgent!, db);

  if (!isAuthTokenOk) {
    res.json("Auth error");
    db.end();
    return;
  }

  let results = await db
    .transaction()
    .query("DELETE FROM games WHERE id = ?", [lastGameId])
    .query(`UPDATE users SET rating = ? WHERE id = ?`, [
      whiteUser.rating,
      whiteUser.id,
    ])
    .query(`UPDATE users SET rating = ? WHERE id = ?`, [
      blackUser.rating,
      blackUser.id,
    ])
    .rollback((e: any) => {
      /* do something with the error */
    }) // optional
    .commit(); // execute the queries

  db.end();

  await res.revalidate("/");

  res.json(results);
}
