import { Request, Response } from "express";
import { CreateUserUserCase } from "../../../app/use-cases/user/create-user.use-case";
import { UserInMemoryRepository } from "../../db/in-memory/user.in-memory.repository";
import { UserViewModelMapper } from "../mapper/user.mapper";

export class UserController {
  async create(req: Request, res: Response) {
    const repository = new UserInMemoryRepository();
    const createUser = new CreateUserUserCase(repository);

    const output = await createUser.execute(req.body);

    return res.status(201).json(UserViewModelMapper.toHTTP(output));
  }
}
