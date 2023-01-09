import { Task } from "../../../domain/entities/Task.entity";
import { TaskRepositoryInterface } from "../../../domain/repositories/task.repository";

export class GetAllTasksByUserIdUserCase {
  constructor(private readonly repository: TaskRepositoryInterface) {}

  async execute(authorId: string): Promise<Task[]> {
    return this.repository.getAll(authorId);
  }
}
