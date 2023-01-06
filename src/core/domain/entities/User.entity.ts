import { randomUUID } from "node:crypto";

export enum Role {
  USER = "USER",
  ADMIN = "ADMIN",
  MAINTAINER = "MAINTAINER",
}

export interface UserProps {
  nickName?: string | null;
  email: string;
  password: string;
  permissionLevel?: Role;
  createdAt?: Date;
  updatedAt?: Date | null;
}

export class User {
  private props: Required<UserProps>;
  private readonly _id: string;
  constructor(props: UserProps, id?: string) {
    this._id = id || randomUUID();
    this.props = {
      ...props,
      nickName: props.nickName || null,
      permissionLevel: props.permissionLevel || Role.USER,
      createdAt: new Date(),
      updatedAt: props.updatedAt || null,
    };
  }

  public get id(): string {
    return this._id;
  }

  public get nickName(): string | null {
    return this.props.nickName;
  }

  private set nickName(value: string | null) {
    this.props.nickName = value;
  }

  //TODO: create validation in quantity characters
  public updateNickName(value: string) {
    this.nickName = value;
  }

  public get email(): string {
    return this.props.email;
  }

  // private set email(value: string) {
  //   this.props.email = value;
  // }

  public get password(): string {
    return this.props.password;
  }

  // private set password(value: string) {
  //   this.props.password = value;
  // }

  public get permissionLevel(): Role {
    return this.props.permissionLevel;
  }

  // private set permissionLevel(value: Role) {
  //   this.props.permissionLevel = value;
  // }

  public get createdAt(): Date {
    return this.props.createdAt;
  }

  public get updatedAt(): Date | null {
    return this.props.updatedAt;
  }

  // private set updatedAt(value: Date | null) {
  //   this.props.updatedAt = value;
  // }
}
