import { Task } from "../../../domain/entities/Task.entity";
import { TaskRepositoryInterface } from "../../../domain/repositories/task.repository";

type taskPropsToUpdate = {
  title: string;
  description: string;
};
export class UpdateDescriptionAndTitleTaskByUserIdUserCase {
  constructor(private readonly repository: TaskRepositoryInterface) {}

  async execute(
    authorId: string,
    id: string,
    taskUpdate: taskPropsToUpdate
  ): Promise<Task | null> {
    const task = await this.repository.filterById(authorId, id);

    if (!task) return null;

    const { title = task.title, description = task.description } = taskUpdate;
    task.updateTitleAndDescriptions(title, description);

    await this.repository.save(task);

    return task;
  }
}
