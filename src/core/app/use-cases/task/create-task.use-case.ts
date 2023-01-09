import { Task } from "../../../domain/entities/Task.entity";
import { TaskRepositoryInterface } from "../../../domain/repositories/task.repository";

type taskInput = {
  title: string;
  description: string;
  tag?: string[];
};

export class CreateTaskUserCase {
  constructor(private readonly repository: TaskRepositoryInterface) {}

  async execute(authorId: string, request: taskInput): Promise<Task> {
    const { title, description, tag = [] } = request;

    const task = new Task({
      authorId,
      title,
      description,
      tag,
    });

    await this.repository.create(task);

    return task;
  }
}
