import { NextFunction, Request, Response } from "express";
import { ValidationError } from "yup";

export class ErrorMiddleware {
  static async execute(
    error: ErrorEvent,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    if (error instanceof ValidationError) {
      return res.status(400).json({ message: error.message });
    }
    return res
      .status(500)
      .json({ message: "ERR-220111-16 - Internal Server Error" });
  }
}
