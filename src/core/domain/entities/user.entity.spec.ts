import { Role, User } from "./User.entity";

describe("User Entity", () => {
  it("Should be able instancy a User", () => {
    const output = new User({
      nickName: "Test",
      email: "test@email.com",
      password: "123456",
      permissionLevel: Role.ADMIN,
    });

    expect(output).toBeTruthy();
    expect(output.id).toBeTruthy();
    expect(output.nickName).toBe("Test");
    expect(output.email).toBe("test@email.com");
    expect(output.password).toBe("123456");
    expect(output.permissionLevel).toBe("ADMIN");
  });

  it("Should be able update updateNickName in User", () => {
    const output = new User({
      email: "test@email.com",
      password: "123456",
    });

    output.updateNickName("Update Name");

    expect(output.nickName).toBe("Update Name");
  });
});
