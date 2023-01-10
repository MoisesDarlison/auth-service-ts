import { Task } from "../../../domain/entities/Task.entity";
import { TaskRepositoryInterface } from "../../../domain/repositories/task.repository";

type taskInput = {
  title: string;
  description: string;
  tags?: string[];
};

export class CreateTaskUserCase {
  constructor(private readonly repository: TaskRepositoryInterface) {}

  async execute(authorId: string, request: taskInput): Promise<Task> {
    const { title, description, tags = [] } = request;

    const task = new Task({
      authorId,
      title,
      description,
      tags,
    });

    await this.repository.create(task);

    return task;
  }
}
