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

    const output = await userUserCase.execute(
      userRepoInMemory.items[0].id,
      "John Due"
    );
    console.log(userRepoInMemory.items[0]);

    expect(userRepoInMemory.items[0].nickName).toBe("John Due");
    expect(userRepoInMemory.items[0].createdAt).not.toBeNull();
    expect(userRepoInMemory.items[0].updatedAt).not.toBeNull();
    expect(userRepoInMemory.items[0].createdAt).not.toEqual(
      userRepoInMemory.items[0].updatedAt
    );
  });
});
