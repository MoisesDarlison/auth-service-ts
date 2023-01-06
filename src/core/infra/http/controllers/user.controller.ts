import { Request, Response } from "express";
import { CreateUserUserCase } from "../../../app/use-cases/user/create-user.use-case";
import { GetAllUsersUserCase } from "../../../app/use-cases/user/get-all-user.use-case";
import { UserInMemoryRepository } from "../../db/in-memory/user.in-memory.repository";
import { UserViewModelMapper } from "../mapper/user.mapper";
const repository = new UserInMemoryRepository();
export class UserController {
  async create(req: Request, res: Response) {
    const useCase = new CreateUserUserCase(repository);

    const output = await useCase.execute(req.body);
    return res.status(201).json(UserViewModelMapper.toHTTP(output));
  }

  async getAll(req: Request, res: Response) {
    const useCase = new GetAllUsersUserCase(repository);

    const output = await useCase.execute();
    return res.status(201).json(output.map(UserViewModelMapper.toHTTP));
  }
}
