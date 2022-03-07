import bcrypt from "bcrypt";
import { scryptSync, createDecipher } from "crypto";

export async function verifyPassword(name: string, password: string, db: any) {
  const queryResult: Array<any> = await db.query(
    `SELECT password FROM users WHERE name="${name}"`
  );
  const dbPassword = queryResult[0].password;

  return await bcrypt.compare(password, dbPassword);
}

export async function verifyAuthToken(
  authToken: any,
  userAgent: string,
  db: any
) {
  const algorithm = "aes-192-cbc";
  const password = "Password used to generate key";
  // Use the async `crypto.scrypt()` instead.
  const key = scryptSync(password, "salt", 24);
  // The IV is usually passed along with the ciphertext.
  //const iv = Buffer.alloc(16, 0); // Initialization vector.

  const decipher = createDecipher(algorithm, key);

  let decrypted = decipher.update(authToken, "hex", "utf8");
  decrypted += decipher.final("utf8");

  const authTokenObj = JSON.parse(decrypted);

  if (userAgent !== authTokenObj.userAgent) {
    return false;
  }

  const isPasswordOk = await verifyPassword(
    authTokenObj.userName,
    authTokenObj.password,
    db
  );
  if (!isPasswordOk) {
    return false;
  }

  return true;
}
