import { NextApiRequest, NextApiResponse } from "next";
import { serialize, CookieSerializeOptions } from "cookie";
import { db } from "../../../lib/db";
import bcrypt from "bcrypt";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //console.log("/api/auth/login", req.cookies);

  //console.log(req.headers["user-agent"]);

  const userAgent = req.headers["user-agent"];

  const formData = req.body;
  //console.log("/api/auth/login formData", formData);

  const queryResult: Array<any> = await db.query(
    `SELECT password FROM users WHERE name="${formData.userName}"`
  );
  const dbPassword = queryResult[0].password;
  //console.log("/api/auth/login dbPassword:", dbPassword);

  bcrypt.compare(formData.password, dbPassword, function (err, result) {
    if (result) {
      res.json("success");
    } else {
      res.json("fail");
    }
  });

  // res.setHeader("Set-Cookie", [
  //   "userName=John; path=/; Secure",
  //   "password=123; path=/; Secure",
  // ]);

  //res.json("Ok");
  //res.end("Ok");
}
