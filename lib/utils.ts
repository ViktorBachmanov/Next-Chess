import bcrypt from "bcrypt";

export async function verifyPassword(name: string, password: string, db: any) {
  const queryResult: Array<any> = await db.query(
    `SELECT password FROM users WHERE name="${name}"`
  );
  const dbPassword = queryResult[0].password;
  //console.log("/api/auth/login dbPassword:", dbPassword);

  return await bcrypt.compare(password, dbPassword);
}
