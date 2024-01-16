import { FingerprintResult } from "express-fingerprint";
import pool from "../db.js";

type RefreshSession = {
  refreshToken: string;
  id?: number;
  fingerprint: FingerprintResult;
};

export class RefreshSessionRepository {
  static async getRefreshSession(refreshToken: string) {
    const response = await pool.query(
      "SELECT * FROM refresh_sessions WHERE refresh_token=$1",
      [refreshToken]
    );

    if (!response.rows.length) {
      return null;
    }

    return response.rows[0];
  }
  static async createRefreshSession({
    id,
    refreshToken,
    fingerprint,
  }: RefreshSession) {
    await pool.query(
      "INSERT INTO refresh_sessions (user_id, refresh_token, finger_print) VALUES ($1, $2, $3) RETURNING *",
      [id, refreshToken, fingerprint.hash]
    );
  }

  static async deleteRefreshSession(refreshToken: string) {
    await pool.query("DELETE FROM refresh_sessions WHERE refresh_token=$1", [
      refreshToken,
    ]);
  }
}
