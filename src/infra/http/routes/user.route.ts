import { Router } from "express";
import { UserController } from "../controllers/user.controller";

const routerUser = Router();

const { signUp, getAll, getById, updateNickNameById, signIn } =
  new UserController();

routerUser.get("/", getAll);
routerUser.get("/from/:id", getById);
routerUser.patch("/from/:id", updateNickNameById);

export { routerUser, signIn, signUp };
