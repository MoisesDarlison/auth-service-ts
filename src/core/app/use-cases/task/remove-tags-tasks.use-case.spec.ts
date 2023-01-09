import { Task } from "../../../domain/entities/Task.entity";
import { repositoryTask } from "../../../infra/db/in-memory/index.in-memory.repository";
import { RemoveTagOnTaskByUserIdUserCase } from "./remove-tags-tasks.use-case";

describe("Remove tag in Tasks - Use Case", () => {
  it("Should be able remove tag on task by User", async () => {
    const useCase = new RemoveTagOnTaskByUserIdUserCase(repositoryTask);
    const fakeAuthorId: string = "8349e65f-220b-49f9-b8fc-cf98b9fb1b2f";

    repositoryTask.items.push(
      new Task({
        authorId: fakeAuthorId,
        title: "test 1",
        description: "description Test",
        tags: ["tag1", "tag2", "tag3"],
      })
    );

    const output = await useCase.execute(
      fakeAuthorId,
      repositoryTask.items[0].id,
      ["tag1", "tag2"]
    );

    expect(output?.tags).toHaveLength(1);
  });

  it("Should be able remove tag task by User", async () => {
    const useCase = new RemoveTagOnTaskByUserIdUserCase(repositoryTask);
    const fakeAuthorId: string = "8349e65f-220b-49f9-b8fc-cf98b9fb1b2f";

    repositoryTask.items.push(
      new Task({
        authorId: fakeAuthorId,
        title: "test 1",
        description: "description Test",
      })
    );

    const output = await useCase.execute(fakeAuthorId, fakeAuthorId, [
      "a",
      "b",
    ]);

    expect(output).toBeNull();
  });
});
