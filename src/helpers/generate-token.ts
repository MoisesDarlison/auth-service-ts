import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../infra/http/middleware/authenticate.middleware";

export class GenerateToken {
  static execute(id: string, email: string, role: string): string {
    return jwt.sign({ id, email }, SECRET_KEY, {
      expiresIn: "2 days",
    });
  }
}
