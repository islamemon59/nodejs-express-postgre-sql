import express, { Request, Response } from "express";
import config from "./config";
import initDB from "./config/db";
import logger from "./middleware/logger";
import { userRoutes } from "./modules/user/user.routes";
import { todoRouters } from "./modules/todo/todo.routes";

const app = express();
const port = config.port;

//json parser
app.use(express.json());
//if need from data
// app.use(express.urlencoded());

initDB();

app.get("/", logger, async (req: Request, res: Response) => {
  res.send("Hello Next Level Developer !");
});

//user CRUD
app.use("/users", userRoutes);

//todos CRUD
app.use("/todos", todoRouters);

app.use((req: Request, res: Response) => {
  res
    .status(404)
    .json({ success: false, message: "Route not found", path: req.path });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
