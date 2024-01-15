import type { Response } from "express";

interface Error {
  status : number;
}

export class ErrorsUtils {
  static catchError(res: Response, error: Error): Response {
    console.log(error);
    return res.status(error.status || 500).json(error);
  }
}

class WebError {
  status: number;
  error: unknown;
  constructor(status: number, error: unknown) {
    this.status = status;
    this.error = error;
  }
}

export class Unprocessable extends WebError {
  constructor(error: unknown) {
    super(422, error);
  }
}
export class Conflict extends WebError {
  constructor(error: unknown) {
    super(409, error);
  }
}

export class NotFound extends WebError {
  constructor(error: unknown) {
    super(404, error);
  }
}

export class Forbidden extends WebError {
  constructor(error: unknown) {
    super(403, error);
  }
}

export class Unauthorized extends WebError {
  constructor(error: unknown) {
    super(401, error);
  }
}

export class BadRequest extends WebError {
  constructor(error: unknown) {
    super(400, error);
  }
}
