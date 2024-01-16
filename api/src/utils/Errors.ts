import type { Response } from "express";

export class ErrorsUtils {
  static catchError(res: Response, error: WebError) {
    console.log(error);
    return res.status(error.status || 500).json(error);
  }
}

class WebError {
  status: number;
  error: string;
  constructor(status: number, error: string) {
    this.status = status;
    this.error = error;
  }
}

export class Unprocessable extends WebError {
  constructor(error: string) {
    super(422, error);
  }
}
export class Conflict extends WebError {
  constructor(error: string) {
    super(409, error);
  }
}

export class NotFound extends WebError {
  constructor(error: string) {
    super(404, error);
  }
}

export class Forbidden extends WebError {
  constructor(error: string) {
    super(403, error);
  }
}

export class Unauthorized extends WebError {
  constructor(error: string) {
    super(401, error);
  }
}

export class BadRequest extends WebError {
  constructor(error: string) {
    super(400, error);
  }
}
