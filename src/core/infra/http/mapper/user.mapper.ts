import { User } from "../../../domain/entities/User.entity";

export class UserViewModelMapper {
  static toHTTP(user: User) {
    return {
      id: user.id,
      email: user.email,
      nickName: user.nickName,
      permissionLevel: user.permissionLevel,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
