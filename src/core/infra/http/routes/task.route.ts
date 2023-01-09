import { Router } from "express";
import { TaskController } from "../controllers/task.controller";

const routerTask = Router();

const { create, getAll } = new TaskController();

routerTask.post("/:id", create);
routerTask.get("/to/:id", getAll);
// routerTask.get("/from/:id", getById);
// routerTask.patch("/from/:id", updateNickNameById);

export { routerTask };
