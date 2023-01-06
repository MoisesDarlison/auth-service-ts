import { Task } from "./Task.entity";
import { Role, User } from "./User.entity";

describe("Task Entity", () => {
  it("Should be able to instancy a Task", () => {
    const user = new User({
      nickName: "Test",
      email: "test@email.com",
      password: "123456",
      permissionLevel: Role.ADMIN,
    });

    const output = new Task({
      title: "title test",
      description: "abcde 123456",
      authorId: user.id,
    });

    expect(output).toBeTruthy();
    expect(output.title).toBe("title test");
    expect(output.description).toBe("abcde 123456");
    expect(output.authorId).toBe(user.id);
    expect(output.createdAt).not.toBeNull();
    expect(output.updatedAt).toBeNull();
    expect(output.tag).toHaveLength(0);

    output.appendTag("test");
    expect(output.tag).toHaveLength(1);
    output.appendTag("test 2");
    expect(output.tag).toHaveLength(2);
  });
});
