import bcrypt from "bcrypt";
import { scryptSync, createCipher, createDecipher } from "crypto";

export async function verifyPassword(name: string, password: string, db: any) {
  const queryResult: Array<any> = await db.query(
    //`SELECT password FROM users WHERE name="${name}"`
    `SELECT password FROM users WHERE name = ?`,
    [name]
  );
  const dbPassword = queryResult[0].password;

  return await bcrypt.compare(password, dbPassword);
}

const algorithm = "aes-192-cbc";
const key = createKey();

export async function verifyAuthToken(
  authToken: any,
  userAgent: string,
  db: any
) {
  const decrypted = decrypt(authToken);

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

export function encrypt(plainToken: string) {
  const cipher = createCipher(algorithm, key);

  let encrypted = cipher.update(plainToken, "utf8", "hex");
  encrypted += cipher.final("hex");

  return encrypted;
}

function decrypt(encrypted: string) {
  const decipher = createDecipher(algorithm, key);

  let decrypted = decipher.update(encrypted, "hex", "utf8");
  decrypted += decipher.final("utf8");

  return decrypted;
}

function createKey() {
  const cryptoPassword = process.env.ENCRYPT_PASSWORD;

  const key = scryptSync(cryptoPassword!, "salt", 24);

  return key;
}

export async function makeHash(token: string) {
  return await bcrypt.hash(token, 10);
}
