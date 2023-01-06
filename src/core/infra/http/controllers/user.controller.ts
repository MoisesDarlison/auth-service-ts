import { Request, Response } from "express";
import { CreateUserUserCase } from "../../../app/use-cases/user/create-user.use-case";
import { FilterUserByIdUserCase } from "../../../app/use-cases/user/filter-user-by-id.use-case";
import { GetAllUsersUserCase } from "../../../app/use-cases/user/get-all-user.use-case";
import { UserInMemoryRepository } from "../../db/in-memory/user.in-memory.repository";
import { UserViewModelMapper } from "../mapper/user.mapper";

//TODO: Change to repo on PRD
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
    return res.status(200).json(output.map(UserViewModelMapper.toHTTP));
  }

  async getById(req: Request, res: Response) {
    const useCase = new FilterUserByIdUserCase(repository);
    const { id } = req.params;
    const output = await useCase.execute(id);

    if (!output) return res.status(404).json({ message: "User not found" });

    return res.status(200).json(UserViewModelMapper.toHTTP(output));
  }
}
