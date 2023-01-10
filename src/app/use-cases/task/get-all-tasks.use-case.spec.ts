import { Task } from "../../../domain/entities/Task.entity";
import { repositoryTask } from "../../../infra/db/in-memory/index.in-memory.repository";
import { GetAllTasksByUserIdUserCase } from "./get-all-tasks.use-case";

describe("List all Tasks by User - Use Case", () => {
  it("Should be able list all Tasks by User", async () => {
    const useCase = new GetAllTasksByUserIdUserCase(repositoryTask);
    const fakeAuthorId: string = "8349e65f-220b-49f9-b8fc-cf98b9fb1b2f";

    repositoryTask.items.push(
      new Task({
        authorId: fakeAuthorId,
        title: "test 1",
        description: "description Test",
      })
    );

    repositoryTask.items.push(
      new Task({
        authorId: "fake Author ID",
        title: "test 3",
        description: "description Test",
      })
    );

    expect(repositoryTask.items).toHaveLength(2);

    const output = await useCase.execute(fakeAuthorId);
    expect(output).toHaveLength(1);
  });
});
