import { Request, Response, NextFunction } from "express";
import * as Yup from "yup";
import { ObjectSchema } from "yup";

import validateRequest from "../utils/ValidateRequest.js";

export type SignInSchema = {
  body: {
    userName: string;
    password: string;
  };
};
export type SignUpSchema = {
  body: {
    userName: string;
    password: string;
    role: number;
  };
};
export type LogoutSchema = {
  cookies: {
   refreshToken : string;
  };
};

export const signInSchema: ObjectSchema<SignInSchema> = Yup.object({
  body: Yup.object({
    userName: Yup.string()
      .required("Это обязательное поле!")
      .max(25, "Максимальная длина поля - 25 символов"),
    password: Yup.string()
      .required("Это обязательное поле!")
      .min(3, "Пароль слишком короткий - минимум 3 символа")
      .max(50, "Максимальная длина - 50 символов"),
  }),
});

export const signUpSchema: ObjectSchema<SignUpSchema> = Yup.object({
  body: Yup.object({
    userName: Yup.string()
      .required("Это обязательное поле!")
      .max(25, "Максимальная длина - 25 символов"),
    password: Yup.string()
      .required("Это обязательное поле!")
      .min(3, "Пароль слишком короткий - минимум 3 символа")
      .max(50, "Максимальная длина - 50 символов"),
    role: Yup.number()
      .required("Это обязательное поле!")
      .typeError("Значение должно быть числом!")
      .min(1, "Минимальное значение - 1")
      .max(3, "Максимальное значение - 3"),
  }),
});

export const logoutSchema : ObjectSchema<LogoutSchema> = Yup.object({
  cookies: Yup.object({
    refreshToken: Yup.string().required("Это обязательное поле!"),
  }),
});

export class AuthValidator {
  static async signIn(req: Request, res: Response, next: NextFunction) {
    return validateRequest(req, res, next, signInSchema);
  }

  static async signUp(req: Request, res: Response, next: NextFunction) {
    return validateRequest(req, res, next, signUpSchema);
  }

  static async logOut(req: Request, res: Response, next: NextFunction) {
    return validateRequest(req, res, next, logoutSchema);
  }

  static async refresh(req: Request, res: Response, next: NextFunction) {
    return validateRequest(req, res, next);
  }
}
