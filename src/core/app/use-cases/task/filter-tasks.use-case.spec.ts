import { Task } from "../../../domain/entities/Task.entity";
import { repositoryTask } from "../../../infra/db/in-memory/index.in-memory.repository";
import { FilterTaskByUserIdUserCase } from "./filter-tasks.use-case";

describe("Finished Tasks - Use Case", () => {
  it("Should be able filter task by User", async () => {
    const useCase = new FilterTaskByUserIdUserCase(repositoryTask);
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

    expect(output?.title).toBe("test 1");
  });

  it("Should be NOT able filter task by User - with invalid TaskID", async () => {
    const useCase = new FilterTaskByUserIdUserCase(repositoryTask);
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
