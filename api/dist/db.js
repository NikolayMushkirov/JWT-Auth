import pg from "pg";
var pool = new pg.Pool({
    user: "postgres",
    password: "root",
    host: "localhost",
    port: 5432,
    database: "auth",
});
export default pool;
