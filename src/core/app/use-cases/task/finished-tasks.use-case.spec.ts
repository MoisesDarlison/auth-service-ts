import { Task } from "../../../domain/entities/Task.entity";
import { repositoryTask } from "../../../infra/db/in-memory/index.in-memory.repository";
import { FinishedTaskByUserIdUserCase } from "./finished-tasks.use-case";

describe("Finished Tasks - Use Case", () => {
  it("Should be able finished task by User", async () => {
    const useCase = new FinishedTaskByUserIdUserCase(repositoryTask);
    const fakeAuthorId: string = "8349e65f-220b-49f9-b8fc-cf98b9fb1b2f";

    repositoryTask.items.push(
      new Task({
        authorId: fakeAuthorId,
        title: "test 1",
        description: "description Test",
      })
    );

    const output = await useCase.execute(
      fakeAuthorId,
      repositoryTask.items[0].id
    );

    expect(output?.finishedAt).not.toBeNull();
    expect(output?.finishedAt).toBeTruthy();
  });

  it("Should be able finished task by User", async () => {
    const useCase = new FinishedTaskByUserIdUserCase(repositoryTask);
    const fakeAuthorId: string = "8349e65f-220b-49f9-b8fc-cf98b9fb1b2f";

    repositoryTask.items.push(
      new Task({
        authorId: fakeAuthorId,
        title: "test 1",
        description: "description Test",
      })
    );

    const output = await useCase.execute(fakeAuthorId, fakeAuthorId);

    expect(output).toBeNull();
  });
});
