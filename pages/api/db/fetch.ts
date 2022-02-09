import prisma from '../../../lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next'


export default async function handle(req: NextApiRequest, res: NextApiResponse) {

  const [users, games] = await Promise.all([prisma.user.findMany({ orderBy: {name: 'asc'}}), 
                                            prisma.game.findMany()]);

    
    prisma.$disconnect();
  //res.json(result);
  res.json(users);
}