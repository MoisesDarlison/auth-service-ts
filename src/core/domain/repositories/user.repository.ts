import { User } from "../entities/User.entity";

export interface UserRepositoryInterface {
  create(user: User): Promise<void>;
  getAll(): Promise<User[]>;
  filterById(id: string): Promise<User | null>;
  updateById(id: string, nickName: string): Promise<void>;
}
