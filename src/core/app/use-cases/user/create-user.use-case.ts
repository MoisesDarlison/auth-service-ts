import { Role, User } from "../../../domain/entities/User.entity";
import { UserRepositoryInterface } from "../../../domain/repositories/user.repository";

type userInput = {
  email: string;
  password: string;
  permissionLevel: string;
};

export class CreateUserUserCase {
  constructor(private readonly repository: UserRepositoryInterface) {}

  async execute(request: userInput): Promise<User> {
    const { email, password, permissionLevel } = request;
    const permissionEnumLevel = Role[permissionLevel as Role];

    const user = new User({
      email,
      password,
      permissionLevel: permissionEnumLevel,
    });

    await this.repository.create(user);

    return user;
  }
}
