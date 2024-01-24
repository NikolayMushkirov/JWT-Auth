import type { Response } from "express";

export class ErrorsUtils {
  static catchError(res: Response, error: WebError) {
    console.log(error);
    return res.status(error.status || 500).json(error);
  }
}

export class WebError {
  status: number;
  error: string | Error;
  constructor(status: number, error: string | Error) {
    this.status = status;
    this.error = error;
  }
}

export class Unprocessable extends WebError {
  constructor(error: string | Error) {
    super(422, error instanceof Error ? error.message : error);
  }
}
export class Conflict extends WebError {
  constructor(error: string | Error) {
    super(409, error instanceof Error ? error.message : error);
  }
}

export class NotFound extends WebError {
  constructor(error: string | Error) {
    super(404, error instanceof Error ? error.message : error);
  }
}

export class Forbidden extends WebError {
  constructor(error: string | Error) {
    super(403, error instanceof Error ? error.message : error);
  }
}

export class Unauthorized extends WebError {
  constructor(error: string | Error) {
    super(401, error instanceof Error ? error.message : error);
  }
}

export class BadRequest extends WebError {
  constructor(error: string | Error) {
    super(400, error instanceof Error ? error.message : error);
  }
}
