import pg from "pg";

const pool = new pg.Pool({
  user: "postgress",
  password: "root",
  host: "localhost",
  port: 5432,
  database: "auth",
});

export default pool;
