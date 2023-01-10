import { Role } from "../../../domain/entities/User.entity";
import { UserInMemoryRepository } from "../../../infra/db/in-memory/user.in-memory.repository";
import { CreateUserUserCase } from "./create-user.use-case";

describe("Create User - Use Case", () => {
  it("Should be able to create a User", async () => {
    const userRepoInMemory = new UserInMemoryRepository();
    const userUserCase = new CreateUserUserCase(userRepoInMemory);

    const output = await userUserCase.execute({
      email: "test@email.com",
      password: "123456",
      permissionLevel: Role.ADMIN,
    });

    expect(userRepoInMemory.items).toHaveLength(1);
    expect(output.email).toBe("test@email.com");
  });
});
