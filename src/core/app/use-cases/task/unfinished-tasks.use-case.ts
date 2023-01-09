import { Task } from "../../../domain/entities/Task.entity";
import { TaskRepositoryInterface } from "../../../domain/repositories/task.repository";

export class UnfinishedTaskByUserIdUserCase {
  constructor(private readonly repository: TaskRepositoryInterface) {}

  async execute(authorId: string, id: string): Promise<Task | null> {
    const task = await this.repository.filterById(authorId, id);

    if (!task) return null;

    task.unfinishedTask();
    await this.repository.save(task);

    return task;
  }
}
