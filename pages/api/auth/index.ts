import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  bcrypt.hash("123", 10, function (err, hash) {
    console.log("Bcrypt hash: ", hash);
  });
  //res.json(tables);
}
