import { ErrorsUtils, Unprocessable } from "./Errors.js";

export default async (req, res, next, schema?) => {
  try {
    if (schema) {
      await schema.validate(req);
    }

    return next();
  } catch ({ path, errors }) {
    return ErrorsUtils.catchError(
      res,
      new Unprocessable(JSON.stringify({ path, errors }))
    );
  }
};
