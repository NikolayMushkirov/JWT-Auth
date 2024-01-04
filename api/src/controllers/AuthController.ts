import { AuthService } from "../services/AuthService.js";
import { ErrorsUtils } from "../utils/Errors.js";

class AuthController {
  static async signIn(req, res) {
    const { fingerprint } = req;
    try {
      return res.sendStatus(200);
    } catch (error) {
      return ErrorsUtils.catchError(res, error);
    }
  }
  static async signUp(req, res) {
    const { userName, password, role } = req.body;
    const { fingerprint } = req;
    try {
      await AuthService.signUp({ userName, password, role });
      return res.sendStatus(200);
    } catch (error) {
      return ErrorsUtils.catchError(res, error);
    }
  }

  static async logOut(req, res) {
    const { fingerprint } = req;
    try {
      return res.sendStatus(200);
    } catch (err) {
      return ErrorsUtils.catchError(res, err);
    }
  }

  static async refresh(req, res) {
    const { fingerprint } = req;
    try {
      return res.sendStatus(200);
    } catch (err) {
      return ErrorsUtils.catchError(res, err);
    }
  }
}
