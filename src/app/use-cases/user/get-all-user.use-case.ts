import { User } from "../../../domain/entities/User.entity";
import { UserRepositoryInterface } from "../../../domain/repositories/user.repository";

export class GetAllUsersUserCase {
  constructor(private readonly repository: UserRepositoryInterface) {}

  async execute(): Promise<User[]> {
    return this.repository.getAll();
  }
}
