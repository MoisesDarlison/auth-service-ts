import { TaskInMemoryRepository } from "../../../infra/db/in-memory/task.in-memory.repository";
import { CreateTaskUserCase } from "./create-task.use-case";

describe("Create Task - Use Case", () => {
  it("Should be able to create a Task at User", async () => {
    const taskRepoInMemory = new TaskInMemoryRepository();
    const taskUserCase = new CreateTaskUserCase(taskRepoInMemory);
    const authorId: string = "54447177-433c-4ddd-834f-49daa3e266eb";

    let output = await taskUserCase.execute(authorId, {
      title: "title Test",
      description: "Description Test",
    });

    expect(taskRepoInMemory.items).toHaveLength(1);
    expect(output.title).toBe("title Test");
    expect(output.tags).toHaveLength(0);

    output = await taskUserCase.execute(authorId, {
      title: "title Test",
      description: "Description Test",
      tags: ["test", "2"],
    });

    expect(output.tags).toHaveLength(2);
  });
});
