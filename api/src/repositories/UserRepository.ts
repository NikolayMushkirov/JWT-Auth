import pool from "../db.js";
import {  ClientHashedData } from "../types/types.js";

export class UserRepository {
  static async createUser({
    userName,
    hashedPassword,
    role,
  }: ClientHashedData) {
    const response = await pool.query(
      "INSERT INTO users (name, password, role) VALUES ($1, $2, $3) RETURNING *",
      [userName, hashedPassword, role]
    );
    return response.rows[0];
  }
  static async getUserData(userName: string) {
    const response = await pool.query("SELECT * FROM users WHERE name=$1", [
      userName,
    ]);
    if (!response.rows.length) {
      return null;
    }
    return response.rows[0];
  }
}
