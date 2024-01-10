import bcrypt from "bcryptjs";

import { UserRepository } from "../repositories/UserRepository.js";
import { Conflict } from "../utils/Errors.js";
import { TokenService } from "./TokenService.js";

export class AuthService {
  static async signIn({ userName, password, fingerprint }) {}
  static async signUp({ userName, password, fingerprint, role }) {
    const userData = await UserRepository.getUserData(userName);
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
  }
}
