import mysql from "serverless-mysql";

export const db = mysql({
  config: {
    host: process.env.MYSQL_HOST,
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_DATABASE,
    password: process.env.MYSQL_PASSWORD,
  },
});
