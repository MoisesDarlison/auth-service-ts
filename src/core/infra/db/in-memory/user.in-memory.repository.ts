import { UserRepositoryInterface } from "../../../domain/repositories/user.repository";
import { User } from "../../../domain/entities/User.entity";

export class UserInMemoryRepository implements UserRepositoryInterface {
  public items: User[] = [];

  async create(user: User): Promise<void> {
    this.items.push(user);
  }

  async getAll(): Promise<User[]> {
    return this.items;
  }

  async filterById(id: string): Promise<User | null> {
    return this.items.find((item) => item.id === id) || null;
  }
}
