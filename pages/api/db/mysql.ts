import { db } from "../../../lib/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const rslt = await db.query("SELECT * FROM users");

  console.log("MySQL: ", rslt);

  //res.json(tables);
}
