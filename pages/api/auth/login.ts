import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../lib/db";
import { verifyPassword, encrypt } from "../../../lib/utils";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const userAgent = req.headers["user-agent"];

  const formData = req.body;

  const isPasswordOk = await verifyPassword(
    formData.userName,
    formData.password,
    db
  );

  db.end();

  if (isPasswordOk) {
    const tokenObj = {
      userAgent,
      userName: formData.userName,
      password: formData.password,
    };

    const encryptedTokenObj = encrypt(JSON.stringify(tokenObj));
    res.send(encryptedTokenObj);
  } else {
    res.json("fail");
  }
}
