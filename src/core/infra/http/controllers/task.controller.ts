import { Request, Response } from "express";
import { CreateTaskUserCase } from "../../../app/use-cases/task/create-task.use-case";
import { FilterUserByIdUserCase } from "../../../app/use-cases/user/filter-user-by-id.use-case";
import {
  repositoryTask,
  repositoryUser,
} from "../../db/in-memory/index.in-memory.repository";
import { TaskViewModelMapper } from "../mapper/task.mapper";

export class TaskController {
  async create(req: Request, res: Response) {
    const UserUseCase = new FilterUserByIdUserCase(repositoryUser);

    const { id } = req.params;
    const userAlreadyExists = await UserUseCase.execute(id);

    if (!userAlreadyExists)
      return res.status(400).json({ message: "User not found" });

    const useCase = new CreateTaskUserCase(repositoryTask);

    const output = await useCase.execute(id, req.body);
    return res.status(201).json(TaskViewModelMapper.toHTTP(output));
  }
}
