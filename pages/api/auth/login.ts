import { NextApiRequest, NextApiResponse } from "next";
import { serialize, CookieSerializeOptions } from "cookie";
import { db } from "../../../lib/db";
import bcrypt from "bcrypt";
import { verifyPassword } from "../../../lib/utils";

import { scrypt, randomFill, createCipher, createDecipheriv } from "crypto";

const algorithm = "aes-192-cbc";
const cryptoPassword = "Password used to generate key";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //console.log("/api/auth/login", req.cookies);

  //console.log(req.headers["user-agent"]);

  const userAgent = req.headers["user-agent"];

  const formData = req.body;
  //console.log("/api/auth/login formData", formData);

  // const queryResult: Array<any> = await db.query(
  //   `SELECT password FROM users WHERE name="${formData.userName}"`
  // );
  // const dbPassword = queryResult[0].password;
  // //console.log("/api/auth/login dbPassword:", dbPassword);

  // const match = await bcrypt.compare(formData.password, dbPassword);

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

    console.log(tokenObj);
    console.log(JSON.stringify(tokenObj));

    scrypt(cryptoPassword, "salt", 24, (err: any, key: any) => {
      if (err) throw err;
      // Then, we'll generate a random initialization vector
      //randomFill(new Uint8Array(16), (err: any, iv: any) => {
      //if (err) throw err;

      const cipher = createCipher(algorithm, key);

      let encrypted = cipher.update(JSON.stringify(tokenObj), "utf8", "hex");
      encrypted += cipher.final("hex");
      //console.log(encrypted);

      // const iv1 = Buffer.alloc(16, 0); // Initialization vector.

      // const decipher = createDecipheriv(algorithm, key, iv);

      // let decrypted = decipher.update(encrypted, "hex", "utf8");
      // decrypted += decipher.final("utf8");
      // console.log(decrypted);
      // console.log(JSON.parse(decrypted));

      res.send(encrypted);
    });
  } else {
    res.json("fail");
  }

  // res.setHeader("Set-Cookie", [
  //   "userName=John; path=/; Secure",
  //   "password=123; path=/; Secure",
  // ]);

  //res.json("Ok");
  //res.end("Ok");
}
