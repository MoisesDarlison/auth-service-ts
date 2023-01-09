import { Task } from "../../../domain/entities/Task.entity";
import { TaskRepositoryInterface } from "../../../domain/repositories/task.repository";

export class TaskInMemoryRepository implements TaskRepositoryInterface {
  public items: Task[] = [];
  async create(task: Task): Promise<void> {
    this.items.push(task);
  }

  async getAll(authorId: string): Promise<Task[]> {
    return this.items.filter((task) => task.authorId === authorId);
  }
}
