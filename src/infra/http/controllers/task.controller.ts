import { Request, Response } from "express";
import { AppendTagOnTaskByUserIdUserCase } from "../../../app/use-cases/task/append-tags-tasks.use-case";
import { CreateTaskUserCase } from "../../../app/use-cases/task/create-task.use-case";
import { FilterTaskByUserIdUserCase } from "../../../app/use-cases/task/filter-tasks.use-case";
import { FinishedTaskByUserIdUserCase } from "../../../app/use-cases/task/finished-tasks.use-case";
import { GetAllTasksByUserIdUserCase } from "../../../app/use-cases/task/get-all-tasks.use-case";
import { RemoveTagOnTaskByUserIdUserCase } from "../../../app/use-cases/task/remove-tags-tasks.use-case";
import { UnfinishedTaskByUserIdUserCase } from "../../../app/use-cases/task/unfinished-tasks.use-case";
import { UpdateDescriptionAndTitleTaskByUserIdUserCase } from "../../../app/use-cases/task/update-description-and-title-tasks.use-case";
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

  async finished(req: Request, res: Response) {
    const UserUseCase = new FilterUserByIdUserCase(repositoryUser);

    const { authorId, id } = req.params;
    const userAlreadyExists = await UserUseCase.execute(authorId);

    if (!userAlreadyExists)
      return res.status(400).json({ message: "User not found" });

    const useCase = new FinishedTaskByUserIdUserCase(repositoryTask);

    const output = await useCase.execute(authorId, id);
    if (!output) return res.status(404).json({ message: "Task not found" });

    return res.status(200).json(TaskViewModelMapper.toHTTP(output));
  }

  async unfinished(req: Request, res: Response) {
    const UserUseCase = new FilterUserByIdUserCase(repositoryUser);

    const { authorId, id } = req.params;
    const userAlreadyExists = await UserUseCase.execute(authorId);

    if (!userAlreadyExists)
      return res.status(400).json({ message: "User not found" });

    const useCase = new UnfinishedTaskByUserIdUserCase(repositoryTask);

    const output = await useCase.execute(authorId, id);
    if (!output) return res.status(404).json({ message: "Task not found" });

    return res.status(200).json(TaskViewModelMapper.toHTTP(output));
  }

  async appendTags(req: Request, res: Response) {
    const UserUseCase = new FilterUserByIdUserCase(repositoryUser);

    const { authorId, id } = req.params;
    const { tags } = req.body;
    const userAlreadyExists = await UserUseCase.execute(authorId);

    if (!userAlreadyExists)
      return res.status(400).json({ message: "User not found" });

    const useCase = new AppendTagOnTaskByUserIdUserCase(repositoryTask);

    const output = await useCase.execute(authorId, id, tags);
    if (!output) return res.status(404).json({ message: "Task not found" });

    return res.status(200).json(TaskViewModelMapper.toHTTP(output));
  }

  async removeTags(req: Request, res: Response) {
    const UserUseCase = new FilterUserByIdUserCase(repositoryUser);

    const { authorId, id } = req.params;
    const { tags } = req.body;
    const userAlreadyExists = await UserUseCase.execute(authorId);

    if (!userAlreadyExists)
      return res.status(400).json({ message: "User not found" });

    const useCase = new RemoveTagOnTaskByUserIdUserCase(repositoryTask);

    const output = await useCase.execute(authorId, id, tags);
    if (!output) return res.status(404).json({ message: "Task not found" });

    return res.status(200).json(TaskViewModelMapper.toHTTP(output));
  }

  async updateTitleAndDescription(req: Request, res: Response) {
    const UserUseCase = new FilterUserByIdUserCase(repositoryUser);

    const { authorId, id } = req.params;
    const { title, description } = req.body;
    const userAlreadyExists = await UserUseCase.execute(authorId);

    if (!userAlreadyExists)
      return res.status(400).json({ message: "User not found" });

    const useCase = new UpdateDescriptionAndTitleTaskByUserIdUserCase(
      repositoryTask
    );

    const output = await useCase.execute(authorId, id, { title, description });
    if (!output) return res.status(404).json({ message: "Task not found" });

    return res.status(200).json(TaskViewModelMapper.toHTTP(output));
  }
}
