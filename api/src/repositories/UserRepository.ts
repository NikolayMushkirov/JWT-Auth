import pool from "../db.js";

export class UserRepository {
  static async createUser({ userName, hashedPassword, role }) {}
  static async getUserData(userName) {
    const response = await pool.query("SELECT * FROM users WHERE name=$1", [
      userName,
    ]);
    if (!response.rows.length) {
      return null;
    }
    return response.rows[0];
  }
}
