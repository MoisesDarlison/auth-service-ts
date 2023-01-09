import { Task } from "../../../domain/entities/Task.entity";
import { TaskRepositoryInterface } from "../../../domain/repositories/task.repository";

export class RemoveTagOnTaskByUserIdUserCase {
  constructor(private readonly repository: TaskRepositoryInterface) {}

  async execute(
    authorId: string,
    id: string,
    tag: string[]
  ): Promise<Task | null> {
    const task = await this.repository.filterById(authorId, id);

    if (!task) return null;

    task.removeTag(tag);

    console.log(task);

    await this.repository.save(task);

    return task;
  }
}
