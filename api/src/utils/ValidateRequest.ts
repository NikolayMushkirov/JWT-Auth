import { Request, Response, NextFunction } from "express";
import { ObjectSchema, ValidationError } from "yup";

import { ErrorsUtils, Unprocessable } from "./Errors.js";
import {
  LogoutSchema,
  SignInSchema,
  SignUpSchema,
} from "../validators/AuthValidator.js";

export default async (
  req: Request,
  res: Response,
  next: NextFunction,
  schema?: ObjectSchema<SignInSchema | SignUpSchema | LogoutSchema>
) => {
  try {
    if (schema) {
      await schema.validate(req);
    }
    return next();
  } catch (error) {
    if (error instanceof ValidationError) {
      const { path, errors } = error;
      return ErrorsUtils.catchError(
        res,
        new Unprocessable(JSON.stringify({ path, errors }))
      );
    }
  }
};
