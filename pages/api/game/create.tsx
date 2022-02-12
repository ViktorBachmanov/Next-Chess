import prisma from '../../../lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next'


export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const { whiteUser, blackUser, winner } = req.body;

  const result = await prisma.game.create({
    data: {
      white: whiteUser,
      black: blackUser,
      winner: winner,
    },
  });

  res.json(result);
}