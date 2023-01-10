import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";

export const SECRET_KEY: Secret =
  process.env?.toString() || "secret value here think in very good text";

export interface CustomRequest extends Request {
  token: string | JwtPayload;
}

export class AuthMiddleware {
  static async jwtVerify(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.header("Authorization")?.replace("Bearer ", "");

      if (!token) {
        throw new Error();
      }

      const decoded = jwt.verify(token, SECRET_KEY);
      (req as CustomRequest).token = decoded;

      next();
    } catch (err) {
      res.status(401).json({ message: "Authenticate fail" });
    }
  }
}
