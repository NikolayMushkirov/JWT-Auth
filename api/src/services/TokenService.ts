import jwt, { JwtPayload } from "jsonwebtoken";

import { NextFunction, Request, RequestHandler, Response } from "express";

import * as dotenv from "dotenv";
import { Forbidden, Unauthorized } from "../utils/Errors.js";

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

  static async verifyAccessToken(accessToken: string) {
    return await jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
  }

  static async verifyRefreshToken(refreshToken: string) {
    return await jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
  }

  static async checkAccess(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(" ")?.[1];

    if (!token) {
      return next(new Unauthorized("Token not found"));
    }

    try {
      const user = await TokenService.verifyAccessToken(token);
      console.log(user, "req user");
    } catch (error) {
      if (error instanceof Error) {
        console.log(error , 'Forbidden');
        return next(new Forbidden(error));
      }
    }

    next();
  }
}
