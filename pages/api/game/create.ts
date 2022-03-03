//import prisma from "../../../lib/prisma";
import { db } from "../../../lib/db";
import { NextApiRequest, NextApiResponse } from "next";

import { SendData } from "../../../types";

import { scryptSync, createDecipher } from "crypto";

const algorithm = "aes-192-cbc";
const password = "Password used to generate key";
// Use the async `crypto.scrypt()` instead.
const key = scryptSync(password, "salt", 24);
// The IV is usually passed along with the ciphertext.
//const iv = Buffer.alloc(16, 0); // Initialization vector.

const decipher = createDecipher(algorithm, key);

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const sendData: SendData = req.body;

  // const gameAddRslt = await prisma.game.create({
  //   data: {
  //     white: sendData.white.id,
  //     black: sendData.black.id,
  //     winner: sendData.winner,
  //     day: sendData.day,
  //   },
  // });

  let authToken = sendData.authToken;

  let decrypted = decipher.update(authToken, "hex", "utf8");
  decrypted += decipher.final("utf8");
  // console.log(decrypted);
  // console.log(JSON.parse(decrypted));
  const authTokenObj = JSON.parse(decrypted);

  const userAgent = req.headers["user-agent"];
  console.log(userAgent);
  console.log(authTokenObj.userAgent);

  if (userAgent !== authTokenObj.userAgent) {
    res.json("Auth error");
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

  // let whiteNewScore = sendData.white.score;
  // if (whiteNewScore !== undefined) {
  //   await updateScore(sendData.white.id, whiteNewScore);
  // }

  // let blackNewScore = sendData.black.score;
  // if (blackNewScore !== undefined) {
  //   await updateScore(sendData.black.id, blackNewScore);
  // }

  await res.unstable_revalidate("/");

  res.json(results);
}

// helper functions

// function updateScore(userId: number, newVal: number) {
//   return prisma.user.update({
//     where: {
//       id: userId,
//     },
//     data: {
//       score: newVal,
//     },
//   });
// }
