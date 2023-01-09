import { Router } from "express";
import { TaskController } from "../controllers/task.controller";

const routerTask = Router();

const { create, getAll, filterById } = new TaskController();

routerTask.post("/:authorId", create);
routerTask.get("/from/:authorId", getAll);
routerTask.get("/from/:authorId/task/:id", filterById);
// routerTask.get("/from/:id", getById);
// routerTask.patch("/from/:id", updateNickNameById);

export { routerTask };
