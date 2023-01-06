import { User } from "../entities/User.entity";

export interface UserRepositoryInterface {
  create(user: User): Promise<void>;
  getAll(): Promise<User[]>;
}
