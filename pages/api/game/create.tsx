import prisma from "../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

import { SendData } from "../../../types";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const sendData: SendData = req.body;

  const gameAddRslt = await prisma.game.create({
    data: {
      white: sendData.white.id,
      black: sendData.black.id,
      winner: sendData.winner,
      day: sendData.day,
    },
  });

  let whiteNewScore = sendData.white.score;
  if (whiteNewScore !== undefined) {
    await updateScore(sendData.white.id, whiteNewScore);
  }

  let blackNewScore = sendData.black.score;
  if (blackNewScore !== undefined) {
    await updateScore(sendData.black.id, blackNewScore);
  }
  /*
  await prisma.user.update({
    where: {
      id: sendData.white.id
    },
    data: {
      score: sendData.white.score
    }
  });*/

  await res.unstable_revalidate("/");

  res.json(gameAddRslt);
}

// helper functions

function updateScore(userId: number, newVal: number) {
  return prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      score: newVal,
    },
  });
}
