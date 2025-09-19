const { Pool } = require("pg");

const pool = new Pool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "password123",
  database: process.env.DB_NAME || "usersdb",
  port: 5432
});

module.exports = pool;
