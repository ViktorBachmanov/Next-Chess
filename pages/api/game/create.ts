import { db } from "../../../lib/db";
import { NextApiRequest, NextApiResponse } from "next";

import { CreateGameData } from "../../../types";

import { verifyAuthToken } from "../../../lib/utils";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const sendData: CreateGameData = req.body;

  let authToken = sendData.authToken;

  const userAgent = req.headers["user-agent"];

  const isAuthTokenOk = await verifyAuthToken(authToken, userAgent!, db);

  if (!isAuthTokenOk) {
    res.json("Auth error");
    db.end();
    return;
  }

  let results = await db
    .transaction()
    .query("INSERT games (white, black, winner, date) VALUES(?, ?, ?, ?)", [
      sendData.white.id,
      sendData.black.id,
      sendData.winner,
      sendData.day,
    ])
    .query(`UPDATE users SET rating = ? WHERE id = ?`, [
      sendData.white.rating,
      sendData.white.id,
    ])
    .query(`UPDATE users SET rating = ? WHERE id = ?`, [
      sendData.black.rating,
      sendData.black.id,
    ])
    .rollback((e: any) => {
      /* do something with the error */
    }) // optional
    .commit(); // execute the queries

  db.end();

  await res.unstable_revalidate("/");

  res.json(results);
}
