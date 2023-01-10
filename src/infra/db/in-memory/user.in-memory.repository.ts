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

  async filterByEmail(email: string): Promise<User | null> {
    return this.items.find((item) => item.email === email) || null;
  }

  async updateById(id: string, nickName: string): Promise<void> {
    const userIndex = this.items.findIndex((item) => item.id === id);
    if (userIndex >= 0) {
      this.items[userIndex].updateNickName(nickName);
    }
  }

  // async findUserAndPassword(
  //   email: string,
  //   password: string
  // ): Promise<User | null> {
  //   const userIndex = this.items.findIndex((item) => item.email === email);
  //   if (userIndex >= 0) {
  //     if (this.items[userIndex].password === password)
  //       return this.items[userIndex];
  //   }
  //   return null;
  // }
}
