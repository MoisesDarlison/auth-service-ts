import { randomUUID } from "node:crypto";

export interface TaskProps {
  authorId: string;
  title: string;
  description: string;
  tag?: string[];
  createdAt?: Date;
  updatedAt?: Date | null;
  finishedAt?: Date | null;
}

export class Task {
  private props: Required<TaskProps>;
  private readonly _id: string;
  constructor(props: TaskProps, id?: string) {
    this._id = id || randomUUID();
    this.props = {
      ...props,
      tag: props.tag || [],
      createdAt: new Date(),
      updatedAt: props.updatedAt || null,
      finishedAt: props.finishedAt || null,
    };
  }

  public get id(): string {
    return this._id;
  }

  public get authorId(): string {
    return this.props.authorId;
  }

  // private set authorId(value: string) {
  //   this.props.authorId = value;
  // }

  public get title(): string {
    return this.props.title;
  }

  // private set title(value: string) {
  //   this.props.title = value;
  // }

  public get description(): string {
    return this.props.description;
  }

  // private set description(value: string) {
  //   this.props.description = value;
  // }

  public get tag(): string[] {
    return this.props.tag;
  }

  private set tag(value: string[]) {
    this.props.tag = value;
  }

  public appendTag(value: string) {
    this.tag = [...this.tag, value];
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }

  public get updatedAt(): Date | null {
    return this.props.updatedAt;
  }

  // private set updatedAt(value: Date | null) {
  //   this.props.updatedAt = value;
  // }

  public get finishedAt(): Date | null {
    return this.props.finishedAt;
  }

  // private set finishedAt(value: Date | null) {
  //   this.props.finishedAt = value;
  // }
}
