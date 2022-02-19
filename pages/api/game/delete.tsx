import prisma from "../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const lastGameId: number = req.body;

  const rslt = await prisma.game.delete({
    where: {
      id: lastGameId,
    },
  });

  res.json(rslt);
}
