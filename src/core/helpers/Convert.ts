import { Role } from "../domain/entities/User.entity";

export class Convert {
  static stringToEnumRole(value: string): Role {
    return value as Role;
  }
}
