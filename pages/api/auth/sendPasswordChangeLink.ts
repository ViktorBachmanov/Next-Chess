import nodemailer from "nodemailer";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";

import { db } from "../../../lib/db";
import { encrypt, makeHash } from "../../../lib/utils";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const fio = req.body;

  console.log("fio: ", fio);

  let email: string = "";
  let token: string = "";

  try {
    const queryResult: Array<any> = await db.query(
      `SELECT email FROM users WHERE name = ?`,
      [fio]
    );

    email = queryResult[0]?.email;

    if (!email) {
      db.end();
      res.status(404).send("Email not found");
      return;
    }

    await db.query("DELETE FROM password_resets WHERE email = ?", [email]);

    token = encrypt(String(Math.random() * 5));

    const tokenHash = await makeHash(token);

    //console.log("token: ", token);
    //console.log("tokenHash: ", tokenHash);

    await db.query("INSERT password_resets (email, token) VALUES(?, ?)", [
      email,
      tokenHash,
    ]);

    db.end();
  } catch (err: any) {
    db.end();
    res.status(500).send("Database error");
    return;
  }

  //console.log("email: ", email);

  const uri = `https://next-chess.vercel.app/resetPassword/${token}`;

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: parseInt(process.env.MAIL_PORT!),
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.MAIL_USERNAME, // generated ethereal user
      pass: process.env.MAIL_PASSWORD, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: `"Шахматный турнир" ${process.env.MAIL_FROM_ADDRESS}`, // sender address
    to: `"${email}"`, // list of receivers
    subject: "Изменение пароля", // Subject line
    //text: "Для смены пароля пройдите по ссылке:", // plain text body
    html: `Для смены пароля пройдите по ссылке:<br><p>
            <a href="${uri}">${uri}</a>`, // html body
  });

  res.status(200).send("Ok");
}
