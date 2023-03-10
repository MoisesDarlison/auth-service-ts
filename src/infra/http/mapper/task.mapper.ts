import { Task } from "../../../domain/entities/Task.entity";

export class TaskViewModelMapper {
  static toHTTP(task: Task) {
    return {
      id: task.id,
      authorId: task.authorId,
      title: task.title,
      description: task.description,
      tags: task.tags,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
      finishedAt: task.finishedAt,
    };
  }
}
