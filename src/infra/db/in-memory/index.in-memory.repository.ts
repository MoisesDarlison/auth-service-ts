import { TaskInMemoryRepository } from "./task.in-memory.repository";
import { UserInMemoryRepository } from "./user.in-memory.repository";

const repositoryUser = new UserInMemoryRepository();
const repositoryTask = new TaskInMemoryRepository();

export { repositoryUser, repositoryTask };
