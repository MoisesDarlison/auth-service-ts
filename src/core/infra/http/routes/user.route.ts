import { Router } from "express";
import { UserInMemoryRepository } from "../../db/in-memory/user.in-memory.repository";
import { UserController } from "../controllers/user.controller";

const routerUser = Router();

const { create, getAll, getById } = new UserController();

routerUser.post("/", create);
routerUser.get("/", getAll);
routerUser.get("/from/:id", getById);

export { routerUser };
