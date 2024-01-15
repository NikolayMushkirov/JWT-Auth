import { COOKIE_SETTINGS } from "../constants.js";
import { AuthService } from "../services/AuthService.js";
import { ClientData } from "../types/types.js";
import { ErrorsUtils } from "../utils/Errors.js";

import { Response, Request } from "express";

export class AuthController {
  static async signIn(req: Request, res: Response) {
    const { fingerprint } = req;
    try {
      return res.sendStatus(200);
    } catch (error) {
      if (error) return ErrorsUtils.catchError(res, error);
    }
  }
  static async signUp(req: Request, res: Response) {
    const { userName, password, role } = req.body as ClientData;
    const { fingerprint } = req;

    try {
      const { accessToken, refreshToken, accessTokenExpiration } =
        await AuthService.signUp({ userName, password, role, fingerprint });

      res.cookie("refreshToken", refreshToken, COOKIE_SETTINGS.REFRESH_TOKEN);

      return res.sendStatus(200).json({ accessToken, accessTokenExpiration });
    } catch (error) {
      return ErrorsUtils.catchError(res, error);
    }
  }

  static async logOut(req: Request, res: Response) {
    const { fingerprint } = req;
    try {
      return res.sendStatus(200);
    } catch (err) {
      return ErrorsUtils.catchError(res, err);
    }
  }

  static async refresh(req: Request, res: Response) {
    const { fingerprint } = req;
    try {
      return res.sendStatus(200);
    } catch (err) {
      return ErrorsUtils.catchError(res, err);
    }
  }
}
