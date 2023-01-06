import express, { Express } from "express";
const routes: Express = express();

import { routerUser } from "./user.route";

routes.use("/v1/user", routerUser);

export { routes };
