import { Request, Response } from "express";
import { CreateTaskUserCase } from "../../../app/use-cases/task/create-task.use-case";
import { FilterTaskByUserIdUserCase } from "../../../app/use-cases/task/filter-tasks.use-case";
import { GetAllTasksByUserIdUserCase } from "../../../app/use-cases/task/get-all-tasks.use-case";
import { FilterUserByIdUserCase } from "../../../app/use-cases/user/filter-user-by-id.use-case";
import {
  repositoryTask,
  repositoryUser,
} from "../../db/in-memory/index.in-memory.repository";
import { TaskViewModelMapper } from "../mapper/task.mapper";

export class TaskController {
  async create(req: Request, res: Response) {
    const UserUseCase = new FilterUserByIdUserCase(repositoryUser);

    const { authorId } = req.params;
    const userAlreadyExists = await UserUseCase.execute(authorId);

    if (!userAlreadyExists)
      return res.status(400).json({ message: "User not found" });

    const useCase = new CreateTaskUserCase(repositoryTask);

    const output = await useCase.execute(authorId, req.body);
    return res.status(201).json(TaskViewModelMapper.toHTTP(output));
  }

  async getAll(req: Request, res: Response) {
    const UserUseCase = new FilterUserByIdUserCase(repositoryUser);

    const { authorId } = req.params;
    const userAlreadyExists = await UserUseCase.execute(authorId);

    if (!userAlreadyExists)
      return res.status(400).json({ message: "User not found" });

    const useCase = new GetAllTasksByUserIdUserCase(repositoryTask);

    const output = await useCase.execute(authorId);
    return res.status(200).json(output.map(TaskViewModelMapper.toHTTP));
  }

  async filterById(req: Request, res: Response) {
    const UserUseCase = new FilterUserByIdUserCase(repositoryUser);

    const { authorId, id } = req.params;
    const userAlreadyExists = await UserUseCase.execute(authorId);

    if (!userAlreadyExists)
      return res.status(400).json({ message: "User not found" });

    const useCase = new FilterTaskByUserIdUserCase(repositoryTask);

    const output = await useCase.execute(authorId, id);
    if (!output) return res.status(404).json({ message: "Task not found" });

    return res.status(200).json(TaskViewModelMapper.toHTTP(output));
  }
}
