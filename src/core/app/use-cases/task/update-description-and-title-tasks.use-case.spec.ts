import { Task } from "../../../domain/entities/Task.entity";
import { repositoryTask } from "../../../infra/db/in-memory/index.in-memory.repository";
import { UpdateDescriptionAndTitleTaskByUserIdUserCase } from "./update-description-and-title-tasks.use-case";

describe("Unfinished Tasks - Use Case", () => {
  it("Should be able update title and/or description task by User", async () => {
    const useCase = new UpdateDescriptionAndTitleTaskByUserIdUserCase(
      repositoryTask
    );
    const fakeAuthorId: string = "8349e65f-220b-49f9-b8fc-cf98b9fb1b2f";

    repositoryTask.items.push(
      new Task({
        authorId: fakeAuthorId,
        title: "test 1",
        description: "description Test",
      })
    );

    const titleOld = repositoryTask.items[0].title;

    const output = await useCase.execute(
      fakeAuthorId,
      repositoryTask.items[0].id,
      { title: "test update", description: "description Test update" }
    );

    expect(output?.finishedAt).toBeNull();
    expect(output?.title).toBe("test update");
    expect(output?.title).not.toBe(titleOld);
  });

  it("Should be able Not update title and/or description task for invalid User", async () => {
    const useCase = new UpdateDescriptionAndTitleTaskByUserIdUserCase(
      repositoryTask
    );
    const fakeAuthorId: string = "8349e65f-220b-49f9-b8fc-cf98b9fb1b2f";

    repositoryTask.items.push(
      new Task({
        authorId: fakeAuthorId,
        title: "test 1",
        description: "description Test",
      })
    );

    const output = await useCase.execute(fakeAuthorId, fakeAuthorId, {
      title: "test update",
      description: "description Test update",
    });

    expect(output).toBeNull();
  });
});
