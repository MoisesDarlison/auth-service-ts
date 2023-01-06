import { Router } from "express";
import { UserInMemoryRepository } from "../../db/in-memory/user.in-memory.repository";
import { UserController } from "../controllers/user.controller";

const routerUser = Router();

const { create, getAll } = new UserController();

routerUser.post("/", create);
routerUser.get("/", getAll);

export { routerUser };
