import { userOutput } from "../../../app/use-cases/user/create-user.use-case";

export class UserViewModelMapper {
  static toHTTP({ user }: userOutput) {
    return {
      id: user.id,
      email: user.email,
      nickName: user.nickName,
      permissionLevel: user.permissionLevel,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  // static toDomain(raw: UserProps, id: string): User {
  //   return new User(
  //     {
  //       email: raw.email,
  //       password: raw.password,
  //       nickName: raw.nickName,
  //       updatedAt: raw.updatedAt,
  //       permissionLevel: raw.permissionLevel,
  //     },
  //     id
  //   );
  // }
}
