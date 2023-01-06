import { Role, User } from "../../../domain/entities/User.entity";
import { UserInMemoryRepository } from "../../../infra/db/in-memory/user.in-memory.repository";
import { GetAllUsersUserCase } from "./get-all-user.use-case";

describe("List all User - Use Case", () => {
  it("Should be able list all Users", async () => {
    const userRepoInMemory = new UserInMemoryRepository();
    const userUserCase = new GetAllUsersUserCase(userRepoInMemory);

    const output = await userUserCase.execute();

    expect(userRepoInMemory.items).toHaveLength(0);

    userRepoInMemory.items.push(
      new User({
        email: "test@email.com",
        password: "123456",
        permissionLevel: "ADMIN" as Role,
      })
    );

    userRepoInMemory.items.push(
      new User({
        email: "test@email.com",
        password: "654321",
      })
    );

    expect(userRepoInMemory.items).toHaveLength(2);
    expect(userRepoInMemory.items[1].permissionLevel).toBe("USER");
  });
});
