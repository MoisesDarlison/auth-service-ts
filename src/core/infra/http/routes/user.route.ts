import { Router } from "express";
import { UserController } from "../controllers/user.controller";

const routerUser = Router();

const { create } = new UserController();

routerUser.post("/", create);
// routerUser.get("/", getAll);

export { routerUser };
