import { Task } from "../entities/Task.entity";

export interface TaskRepositoryInterface {
  create(task: Task): Promise<void>;
  getAll(authorId: string): Promise<Task[]>;
  // filterById(id: string): Promise<User | null>;
  // updateById(id: string, nickName: string): Promise<void>;
}
