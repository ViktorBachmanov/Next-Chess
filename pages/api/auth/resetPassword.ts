import { NextApiRequest, NextApiResponse } from "next";

import bcrypt from "bcrypt";

import { db } from "../../../lib/db";
import { makeHash } from "../../../lib/utils";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //res.redirect("/resetPassword");

  const { userName, password, token } = req.body;

  try {
    const queryResult: Array<any> = await db.query(
      `SELECT id, email FROM users WHERE name = ?`,
      [userName]
    );

    const { id, email } = queryResult[0];

    console.log("id: ", id);
    console.log("email: ", email);

    if (!email) {
      //db.end();
      res.status(404).send("Проверьте ФИО");
    }

    const tokenQuery: Array<any> = await db.query(
      `SELECT token FROM password_resets WHERE email = ?`,
      [email]
    );
    const tokenHash = tokenQuery[0]?.token;

    console.log("tokenHash", tokenHash);

    const match = await bcrypt.compare(token, tokenHash);
    if (!match) {
      res.status(500).send("Ошибка токена");
      db.end();
      return;
    }

    const passwordHash = await makeHash(password);

    console.log("passwordHash: ", passwordHash);

    const updateQuery: any = await db.query(
      `UPDATE users SET password = ? WHERE id = ?`,
      [passwordHash, id]
    );

    console.log("updateQuery: ", updateQuery);
    if (updateQuery.changedRows === 1) {
      res.send("Пароль изменён");
    }
  } catch (err: any) {
    //db.end();
    res.status(500).send("Database error");
  }

  db.end();

  console.log("api/auth/resetPassword end");

  //res.send("Ok");
}
