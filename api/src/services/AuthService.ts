import bcrypt from "bcryptjs";

import { UserRepository } from "../repositories/UserRepository.js";
import { Conflict } from "../utils/Errors.js";

export class AuthService {
  static async signIn({ userName, password, fingerprint }) {}
  static async signUp({ userName, password, fingerprint, role }) {
    const userData = await UserRepository.getUserData(userName);
    if (userData) {
      throw new Conflict("Пользователь с таким именем уже существует");
    }
    const hashedPassword = bcrypt.hashSync(password, 8);
  }
}
