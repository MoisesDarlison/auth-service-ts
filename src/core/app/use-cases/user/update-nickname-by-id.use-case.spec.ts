import { Role, User } from "../../../domain/entities/User.entity";
import { UserInMemoryRepository } from "../../../infra/db/in-memory/user.in-memory.repository";
import { UpdateNickNameByIdUserCase } from "./update-nickname-by-id.use-case";

describe("Update User by ID - Use Case", () => {
  const userRepoInMemory = new UserInMemoryRepository();

  it("Should be able update mickName by Id", async () => {
    const userUserCase = new UpdateNickNameByIdUserCase(userRepoInMemory);

    userRepoInMemory.items.push(
      new User({
        email: "test@email.com",
        password: "123456",
        permissionLevel: "ADMIN" as Role,
      })
    );

    expect(userRepoInMemory.items).toHaveLength(1);
    expect(userRepoInMemory.items[0].updatedAt).toBeNull();

    await userUserCase.execute(userRepoInMemory.items[0].id, "John Due");

    expect(userRepoInMemory.items[0].nickName).toBe("John Due");
    expect(userRepoInMemory.items[0].createdAt).not.toBeNull();
    expect(userRepoInMemory.items[0].updatedAt).not.toBeNull();
    expect(userRepoInMemory.items[0].createdAt).not.toEqual(
      userRepoInMemory.items[0].updatedAt
    );
  });

  it("Should be NOT able update mickName by Id - with invalid id", async () => {
    const userUserCase = new UpdateNickNameByIdUserCase(userRepoInMemory);

    userRepoInMemory.items.push(
      new User({
        email: "test@email.com",
        password: "123456",
        permissionLevel: "ADMIN" as Role,
      })
    );

    expect(userRepoInMemory.items).toHaveLength(2);

    const fakeID: string = "54447177-433c-4ddd-834f-49daa3e266eb";

    expect(async () => {
      return userUserCase.execute(fakeID, "John Due");
    }).rejects.toThrow();
  });
});
