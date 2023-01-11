import express, { Express } from "express";
const routes: Express = express();

import { routerUser, signIn, signUp } from "./user.route";
import { routerTask } from "./task.route";
import { AuthMiddleware } from "../middleware/authenticate.middleware";
import { ErrorMiddleware } from "../middleware/error.middleware";

routes.post("/v1/sign-up", signUp);
routes.post("/v1/sign-in", signIn);

routes.use("/v1/user", AuthMiddleware.jwtVerify, routerUser);
routes.use("/v1/task", AuthMiddleware.jwtVerify, routerTask);
routes.use("/", ErrorMiddleware.execute);

export { routes };
