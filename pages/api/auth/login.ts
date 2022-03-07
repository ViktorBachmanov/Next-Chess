import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../lib/db";
import { verifyPassword } from "../../../lib/utils";

import { scrypt, createCipher } from "crypto";

const algorithm = "aes-192-cbc";
const cryptoPassword = "Password used to generate key";

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

    scrypt(cryptoPassword, "salt", 24, (err: any, key: any) => {
      if (err) throw err;

      const cipher = createCipher(algorithm, key);

      let encrypted = cipher.update(JSON.stringify(tokenObj), "utf8", "hex");
      encrypted += cipher.final("hex");

      res.send(encrypted);
    });
  } else {
    res.json("fail");
  }
}
