import { Role, User } from "../../../domain/entities/User.entity";
import { UserInMemoryRepository } from "../../../infra/db/in-memory/user.in-memory.repository";
import { AuthenticateUserUseCase } from "./authenticate-user.use-case";

describe("SingIn User - Use Case", () => {
  it("Should be able to SingIn User", async () => {
    const userRepoInMemory = new UserInMemoryRepository();
    const userUserCase = new AuthenticateUserUseCase(userRepoInMemory);

    userRepoInMemory.items.push(
      new User({
        email: "test@email.com",
        password: "123456",
        permissionLevel: "ADMIN" as Role,
      })
    );

    const output = await userUserCase.execute({
      email: "test@email.com",
      password: "123456",
    });

    expect(userRepoInMemory.items).toHaveLength(1);
    expect(output?.email).toBe("test@email.com");
  });

  it("Should be NOT able to SingIn User with invalid password", async () => {
    const userRepoInMemory = new UserInMemoryRepository();
    const userUserCase = new AuthenticateUserUseCase(userRepoInMemory);

    userRepoInMemory.items.push(
      new User({
        email: "test@email.com",
        password: "123456",
        permissionLevel: "ADMIN" as Role,
      })
    );

    const output = await userUserCase.execute({
      email: "test@email.com",
      password: "1234",
    });

    expect(userRepoInMemory.items).toHaveLength(1);
    expect(output).toBeNull();
  });
});
