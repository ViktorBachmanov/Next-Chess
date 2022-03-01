import { NextApiRequest, NextApiResponse } from "next";
import { serialize, CookieSerializeOptions } from "cookie";
import { db } from "../../../lib/db";

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

  //res.removeHeader("Set-Cookie");

  // bcrypt.hash("123", 10, function (err, hash) {
  //   console.log("Bcrypt hash: ", hash);
  // });

  //res.setHeader("Set-Cookie", serialize("userName", "John"));
  //res.setHeader("Set-Cookie", "userName=John; HttpOnly; Secure");
  //res.setHeader("Set-Cookie", "userName=John; path=/; Secure");
  res.setHeader("Set-Cookie", [
    "userName=John; path=/; Secure",
    "password=123; path=/; Secure",
  ]);

  res.json("Ok");
  //res.end("Ok");
}
