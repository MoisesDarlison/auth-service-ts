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
    expect(output.user.email).toBe("test@email.com");
    // expect(output).toStrictEqual({
    //   id: repository.items[0].id,
    //   : 'my title',
    //   startPosition: { lat: 1, lng: 2 },
    //   endPosition: { lat: 3, lng: 4 },
    //   points: [],
    // });
  });
});
