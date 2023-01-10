import { Task } from "../../../domain/entities/Task.entity";
import { TaskRepositoryInterface } from "../../../domain/repositories/task.repository";

export class FilterTaskByUserIdUserCase {
  constructor(private readonly repository: TaskRepositoryInterface) {}

  async execute(authorId: string, id: string): Promise<Task | null> {
    return this.repository.filterById(authorId, id);
  }
}
