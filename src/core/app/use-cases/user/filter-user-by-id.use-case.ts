import { User } from "../../../domain/entities/User.entity";
import { UserRepositoryInterface } from "../../../domain/repositories/user.repository";

export class FilterUserByIdUserCase {
  constructor(private readonly repository: UserRepositoryInterface) {}

  async execute(id: string): Promise<User | null> {
    return this.repository.filterById(id);
  }
}
