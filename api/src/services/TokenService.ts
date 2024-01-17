import jwt, { JwtPayload } from "jsonwebtoken";

import { NextFunction } from "express";

import * as dotenv from "dotenv";
import { Forbidden, Unauthorized } from "../utils/Errors.js";

dotenv.config();

interface CheckUserAccess extends Request {
  user: string | JwtPayload;
}

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

  static async verifyAccessToken(accessToken: string) {
    return await jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
  }

  static async verifyRefreshToken(refreshToken: string) {
    return await jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
  }

  static async checkAccess(req: CheckUserAccess, _: undefined, next: NextFunction) {
    const authHeader = req.headers.get("Authorization");
    const token = authHeader?.split(" ")?.[1];

    if (!token) {
      return next(new Unauthorized("Unauthorized"));
    }

    try {
      req.user = await TokenService.verifyAccessToken(token);
      console.log(req.user);
    } catch (error) {
      console.log(error);
      return next(new Forbidden("error Forbidden"));
    }

    next();
  }
}
