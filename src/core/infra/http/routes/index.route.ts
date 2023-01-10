import express, { Express } from "express";
const routes: Express = express();

import { routerUser, signIn } from "./user.route";
import { routerTask } from "./task.route";

routes.use("/v1/user", routerUser);
routes.use("/v1/task", routerTask);
routes.post("/v1/sign-in", signIn);

export { routes };
