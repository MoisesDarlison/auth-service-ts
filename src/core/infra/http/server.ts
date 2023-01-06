import express, { Express } from "express";
import { routes } from "./routes/index.route";
const PORT = process.env.PORT || 3000;

const app: Express = express();
app.use(express.json());

app.use(routes);

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
