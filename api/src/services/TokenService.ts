import jwt, { JwtPayload } from "jsonwebtoken";

import { NextFunction } from "express";

import * as dotenv from "dotenv";

dotenv.config();

export class TokenService {
  static async generateAccessToken(payload: string | JwtPayload) {
    return await jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "30m",
    });
  }
  static async generateRefreshToken(payload: string | JwtPayload) {
    return await jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: "15d",
    });
  }

  static async checkAccess(req: Request, _: undefined, next: NextFunction) {}
}
