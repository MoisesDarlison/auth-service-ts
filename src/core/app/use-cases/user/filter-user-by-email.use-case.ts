import { User } from "../../../domain/entities/User.entity";
import { UserRepositoryInterface } from "../../../domain/repositories/user.repository";

export class FilterUserByEmailUserCase {
  constructor(private readonly repository: UserRepositoryInterface) {}

  async execute(email: string): Promise<User | null> {
    return this.repository.filterByEmail(email);
  }
}
