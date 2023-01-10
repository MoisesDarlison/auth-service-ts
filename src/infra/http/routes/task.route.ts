import { Router } from "express";
import { TaskController } from "../controllers/task.controller";

const routerTask = Router();

const {
  create,
  getAll,
  filterById,
  finished,
  unfinished,
  appendTags,
  removeTags,
  updateTitleAndDescription,
} = new TaskController();

routerTask.post("/:authorId", create);
routerTask.get("/from/:authorId", getAll);
routerTask.get("/from/:authorId/task/:id", filterById);
routerTask.patch("/from/:authorId/task/finished/:id", finished);
routerTask.patch("/from/:authorId/task/unfinished/:id", unfinished);
routerTask.patch("/from/:authorId/task/appendTags/:id", appendTags);
routerTask.patch("/from/:authorId/task/removeTags/:id", removeTags);
routerTask.patch("/from/:authorId/task/update/:id", updateTitleAndDescription);

export { routerTask };
