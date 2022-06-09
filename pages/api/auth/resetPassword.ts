import { NextApiRequest, NextApiResponse } from "next";

import { db } from "../../../lib/db";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.redirect("/resetPassword");
}
