import { UserRepositoryInterface } from "../../../domain/repositories/user.repository";

export class UpdateNickNameByIdUserCase {
  constructor(private readonly repository: UserRepositoryInterface) {}

  async execute(id: string, nickName: string): Promise<void> {
    const userAlreadyExists = await this.repository.filterById(id);

    if (!userAlreadyExists || !nickName) throw new Error();

    await this.repository.updateById(id, nickName);
  }
}
