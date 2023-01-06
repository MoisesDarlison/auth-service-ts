import { UserRepositoryInterface } from "../../../domain/repositories/user.repository";
import { User } from "../../../domain/entities/User.entity";

export class UserInMemoryRepository implements UserRepositoryInterface {
  items: User[] = [];
  async create(user: User): Promise<void> {
    this.items.push(user);
  }
}
