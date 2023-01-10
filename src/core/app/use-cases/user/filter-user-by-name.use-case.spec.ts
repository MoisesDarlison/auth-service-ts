import { Role, User } from "../../../domain/entities/User.entity";
import { UserInMemoryRepository } from "../../../infra/db/in-memory/user.in-memory.repository";
import { FilterUserByEmailUserCase } from "./filter-user-by-name.use-case";

describe("Filter User by ID - Use Case", () => {
  it("Should be able Filter user by Id ", async () => {
    const userRepoInMemory = new UserInMemoryRepository();
    const userUserCase = new FilterUserByEmailUserCase(userRepoInMemory);

    userRepoInMemory.items.push(
      new User({
        email: "test@email.com",
        password: "123456",
        permissionLevel: "ADMIN" as Role,
      })
    );

    const output = await userUserCase.execute("test@email.com");

    expect(userRepoInMemory.items).toHaveLength(1);
    expect(userRepoInMemory.items[0].id).toBe(output?.id);
    expect(output?.email).toBe("test@email.com");
  });

  it("Should to return NULL if it does not find the user by ID", async () => {
    const userRepoInMemory = new UserInMemoryRepository();
    const userUserCase = new FilterUserByEmailUserCase(userRepoInMemory);

    userRepoInMemory.items.push(
      new User({
        email: "test@email.com",
        password: "123456",
        permissionLevel: "ADMIN" as Role,
      })
    );

    const output = await userUserCase.execute("fake@email");

    expect(userRepoInMemory.items).toHaveLength(1);
    expect(userRepoInMemory.items[0].id).not.toBe(output?.id);
    expect(output).toBeNull();
  });
});
