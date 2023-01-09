import { randomUUID } from "node:crypto";

export interface TaskProps {
  authorId: string;
  title: string;
  description: string;
  tags?: string[];
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
      tags: props.tags || [],
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

  public get tags(): string[] {
    return this.props.tags;
  }

  private set tags(value: string[]) {
    this.props.tags = value;
  }

  public appendTag(value: string[]) {
    this.updatedAt = new Date();
    this.tags = [...new Set([...this.tags, ...value])];
  }

  public removeTag(value: string[]) {
    this.updatedAt = new Date();
    this.tags = this.tags.filter((item) => !value.includes(item));
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }

  public get updatedAt(): Date | null {
    return this.props.updatedAt;
  }

  private set updatedAt(value: Date | null) {
    this.props.updatedAt = value;
  }

  public get finishedAt(): Date | null {
    return this.props.finishedAt;
  }

  private set finishedAt(value: Date | null) {
    this.props.finishedAt = value;
  }

  public finishedTask() {
    const now = new Date();
    this.updatedAt = now;
    this.finishedAt = now;
  }

  public unfinishedTask() {
    this.updatedAt = new Date();
    this.finishedAt = null;
  }
}
