// Variables for connection to mysql database
import mysql from "mysql";
import dotenv from "dotenv";
import process from "process";
let db;
dotenv.config();

// A login system to the mysql database
// Connection to mysql database
db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DB_NAME,
  charset: "utf8mb4",
});

export default db;
