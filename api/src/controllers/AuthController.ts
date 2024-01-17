import { COOKIE_SETTINGS } from "../constants.js";
import { AuthService } from "../services/AuthService.js";
import { ClientData } from "../types/types.js";
import { ErrorsUtils, WebError } from "../utils/Errors.js";

import { Response, Request } from "express";

export class AuthController {
  static async signIn(req: Request, res: Response) {
    const { userName, password } = req.body;
    const { fingerprint } = req;

    if (!fingerprint) {
      return res.status(400).json({ message: "Fingerprint not provided" });
    }
    try {
      const { accessToken, refreshToken, accessTokenExpiration } =
        await AuthService.signIn({
          userName,
          password,
          fingerprint,
        });
      res.cookie("refreshToken", refreshToken, COOKIE_SETTINGS.REFRESH_TOKEN);

      return res.status(200).json({ accessToken, accessTokenExpiration });
    } catch (error) {
      if (error instanceof WebError) return ErrorsUtils.catchError(res, error);
      return console.log(error);
    }
  }
  static async signUp(req: Request, res: Response) {
    const { userName, password, role } = req.body as ClientData;
    const { fingerprint } = req;

    if (!fingerprint) {
      return res.status(400).json({ message: "Fingerprint not provided" });
    }

    try {
      const { accessToken, refreshToken, accessTokenExpiration } =
        await AuthService.signUp({ userName, password, role, fingerprint });

      res.cookie("refreshToken", refreshToken, COOKIE_SETTINGS.REFRESH_TOKEN);

      return res.status(200).json({ accessToken, accessTokenExpiration });
    } catch (error) {
      if (error instanceof WebError) {
        return ErrorsUtils.catchError(res, error);
      }
    }
  }

  static async logOut(req: Request, res: Response) {
    const { fingerprint } = req;
    try {
      return res.sendStatus(200);
    } catch (error) {
      if (error instanceof WebError) {
        return ErrorsUtils.catchError(res, error);
      }
    }
  }

  static async refresh(req: Request, res: Response) {
    const { fingerprint } = req;
    try {
      return res.sendStatus(200);
    } catch (error) {
      if (error instanceof WebError) {
        return ErrorsUtils.catchError(res, error);
      }
    }
  }
}
