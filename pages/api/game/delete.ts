//import prisma from "../../../lib/prisma";
import { db } from "../../../lib/db";

import { NextApiRequest, NextApiResponse } from "next";
import { verifyAuthToken } from "../../../lib/utils";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //const lastGameId: number = req.body;
  const sendData: any = req.body;
  const lastGameId: number = sendData.gameId;
  const authToken: string = sendData.authToken;

  const userAgent = req.headers["user-agent"];

  // const rslt = await prisma.game.delete({
  //   where: {
  //     id: lastGameId,
  //   },
  // });

  const isAuthTokenOk = verifyAuthToken(authToken, userAgent!, db);

  if (!isAuthTokenOk) {
    res.json("Auth error");
    db.end();
    return;
  }

  let results = await db
    .transaction()
    .query("DELETE FROM games WHERE id = ?", [lastGameId])
    .query(`UPDATE users SET rating = ? WHERE id=${sendData.white.id}`, [
      sendData.white.rating,
    ])
    .query(`UPDATE users SET rating = ? WHERE id=${sendData.black.id}`, [
      sendData.black.rating,
    ])
    .rollback((e: any) => {
      /* do something with the error */
    }) // optional
    .commit(); // execute the queries

  db.end();

  await res.unstable_revalidate("/");

  res.json(results);
  //res.end();
}
