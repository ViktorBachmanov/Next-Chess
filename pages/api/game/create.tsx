import prisma from '../../../lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next'


export default async function handle(req: NextApiRequest, res: NextApiResponse) {

  const result = await prisma.game.create({
    data: {
      white: 5,
      black: 6,
      winner: 6,
    },
  });

  res.json(result);
}