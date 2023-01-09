import { Router } from "express";
import { TaskController } from "../controllers/task.controller";

const routerTask = Router();

const { create } = new TaskController();

routerTask.post("/:id", create);
// routerUser.get("/", getAll);
// routerUser.get("/from/:id", getById);
// routerUser.patch("/from/:id", updateNickNameById);

export { routerTask };
