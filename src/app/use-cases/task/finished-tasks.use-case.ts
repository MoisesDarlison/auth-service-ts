import { Task } from "../../../domain/entities/Task.entity";
import { TaskRepositoryInterface } from "../../../domain/repositories/task.repository";

export class FinishedTaskByUserIdUserCase {
  constructor(private readonly repository: TaskRepositoryInterface) {}

  async execute(authorId: string, id: string): Promise<Task | null> {
    const task = await this.repository.filterById(authorId, id);

    if (!task) return null;

    task.finishedTask();
    await this.repository.save(task);

    return task;
  }
}
