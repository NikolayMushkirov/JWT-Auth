import dotenv from "dotenv";

dotenv.config();

export class TokenService {
  static async generateAccessToken(payload) {}
  static async generateRefreshToken(payload) {}

  static async checkAccess(req, _, next) {}
}
