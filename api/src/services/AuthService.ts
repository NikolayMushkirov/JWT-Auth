import bcrypt from "bcryptjs";
import { FingerprintResult } from "express-fingerprint";

import { UserRepository } from "../repositories/UserRepository.js";
import { RefreshSessionRepository } from "../repositories/RefreshSessionRepository.js";

import { TokenService } from "./TokenService.js";

import { Conflict, Forbidden, NotFound } from "../utils/Errors.js";

import { ACCESS_TOKEN_EXPIRATION } from "../constants.js";

import { ClientData } from "../types/types.js";

type AuthServiceData = ClientData & {
  id?: number;
  fingerprint: FingerprintResult;
};

export class AuthService {
  static async signIn({
    userName,
    password,
    fingerprint,
  }: Omit<AuthServiceData, "role" | "id">) {
    const userData: AuthServiceData = await UserRepository.getUserData(
      userName
    );

    if (!userData) {
      throw new NotFound("Пользователь не найден");
    }

    const isPasswordValid = bcrypt.compareSync(password, userData.password);

    if (!isPasswordValid) {
      throw new Forbidden("Неверное имя или пароль");
    }

    const payload = { role: userData.role, id: userData.id, userName };
    const accessToken = await TokenService.generateAccessToken(payload);
    const refreshToken = await TokenService.generateRefreshToken(payload);

    await RefreshSessionRepository.createRefreshSession({
      id: userData.id,
      refreshToken,
      fingerprint,
    });

    return {
      accessToken,
      refreshToken,
      accessTokenExpiration: ACCESS_TOKEN_EXPIRATION,
    };
  }
  static async signUp({
    userName,
    password,
    fingerprint,
    role,
  }: AuthServiceData) {
    const userData: AuthServiceData = await UserRepository.getUserData(
      userName
    );
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

  static async logOut(refreshToken: string) {
    await RefreshSessionRepository.deleteRefreshSession(refreshToken);
  }
}
