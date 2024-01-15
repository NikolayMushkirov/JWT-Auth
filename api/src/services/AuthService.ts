import bcrypt from "bcryptjs";

import { UserRepository } from "../repositories/UserRepository.js";
import { Conflict } from "../utils/Errors.js";
import { TokenService } from "./TokenService.js";
import { RefreshSessionRepository } from "../repositories/RefreshSessionRepository.js";
import { ACCESS_TOKEN_EXPIRATION } from "../constants.js";
import { ClientData } from "../types/types.js";
import { FingerprintResult } from "express-fingerprint";

type AuthServiceData = ClientData & {
  fingerprint?: FingerprintResult;
};

export class AuthService {
  static async signIn({ userName, password, fingerprint }: AuthServiceData) {}
  static async signUp({
    userName,
    password,
    fingerprint,
    role,
  }: AuthServiceData) {
    const userData: string = await UserRepository.getUserData(userName);
    if (userData) {
      throw new Conflict("Пользователь с таким именем уже существует");
    }
    const hashedPassword = bcrypt.hashSync(password, 8);
    const { id } = await UserRepository.createUser({
      userName,
      hashedPassword,
      role,
    });
    const payload = { id, userName, role };
    const accessToken = await TokenService.generateAccessToken(payload);
    const refreshToken = await TokenService.generateRefreshToken(payload);

    await RefreshSessionRepository.createRefreshSession({
      id,
      refreshToken,
      fingerprint,
    });

    return {
      accessToken,
      refreshToken,
      accessTokenExpiration: ACCESS_TOKEN_EXPIRATION,
    };
  }
}
