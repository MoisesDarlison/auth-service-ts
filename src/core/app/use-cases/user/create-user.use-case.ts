import { Role, User } from "../../../domain/entities/User.entity";
import { UserRepositoryInterface } from "../../../domain/repositories/user.repository";

export interface userOutput {
  user: User;
}

type userInput = {
  email: string;
  password: string;
  permissionLevel: string;
};

export class CreateUserUserCase {
  constructor(private readonly repository: UserRepositoryInterface) {}

  async execute(request: userInput): Promise<userOutput> {
    const { email, password, permissionLevel } = request;
    const permissionEnumLevel = Role[permissionLevel as Role];

    const newUser = new User({
      email,
      password,
      permissionLevel: permissionEnumLevel,
    });

    await this.repository.create(newUser);

    return { user: newUser };
  }
}
