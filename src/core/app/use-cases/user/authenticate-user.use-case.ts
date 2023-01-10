import { User } from "../../../domain/entities/User.entity";
import { UserRepositoryInterface } from "../../../domain/repositories/user.repository";

type userAuthenticationRequest = {
  email: string;
  password: string;
};

export class AuthenticateUserUseCase {
  constructor(private readonly repository: UserRepositoryInterface) {}

  async execute({
    email,
    password,
  }: userAuthenticationRequest): Promise<User | null> {
    return this.repository.findUserAndPassword(email, password);
  }
}
