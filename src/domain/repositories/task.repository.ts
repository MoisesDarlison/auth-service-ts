import { Task } from "../entities/Task.entity";

export interface TaskRepositoryInterface {
  create(task: Task): Promise<void>;
  getAll(authorId: string): Promise<Task[]>;
  filterById(authorId: string, id: string): Promise<Task | null>;
  save(task: Task): Promise<void>;
}
