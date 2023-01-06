import { Role, User } from "../../../domain/entities/User.entity";
import { UserInMemoryRepository } from "../../../infra/db/in-memory/user.in-memory.repository";
import { FilterUserByIdUserCase } from "./filter-user-by-id.use-case";

describe("Filter User by ID - Use Case", () => {
  it("Should be able Filter user by Id ", async () => {
    const userRepoInMemory = new UserInMemoryRepository();
    const userUserCase = new FilterUserByIdUserCase(userRepoInMemory);

    userRepoInMemory.items.push(
      new User({
        email: "test@email.com",
        password: "123456",
        permissionLevel: "ADMIN" as Role,
      })
    );

    const output = await userUserCase.execute(userRepoInMemory.items[0].id);

    expect(userRepoInMemory.items).toHaveLength(1);
    expect(userRepoInMemory.items[0].id).toBe(output?.id);
    expect(output?.email).toBe("test@email.com");
  });

  it("Should to return NULL if it does not find the user by ID", async () => {
    const userRepoInMemory = new UserInMemoryRepository();
    const userUserCase = new FilterUserByIdUserCase(userRepoInMemory);

    userRepoInMemory.items.push(
      new User({
        email: "test@email.com",
        password: "123456",
        permissionLevel: "ADMIN" as Role,
      })
    );

    const output = await userUserCase.execute(
      "8a32037f-a5fe-4e15-b9b0-f178e4d78c71"
    );

    expect(userRepoInMemory.items).toHaveLength(1);
    expect(userRepoInMemory.items[0].id).not.toBe(output?.id);
    expect(output).toBeNull();
  });
});
