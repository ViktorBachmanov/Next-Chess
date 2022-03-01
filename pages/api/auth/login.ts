import { NextApiRequest, NextApiResponse } from "next";
import { serialize, CookieSerializeOptions } from "cookie";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
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
