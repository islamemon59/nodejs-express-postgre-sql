import express, { Request, Response } from "express";
import initDB from "./config/db";
import logger from "./middleware/logger";
import { userRoutes } from "./modules/user/user.routes";
import { todoRouters } from "./modules/todo/todo.routes";
import { authRoutes } from "./modules/auth/auth.routes";

const app = express();

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

// auth routes
app.use("/auth", authRoutes);

app.use((req: Request, res: Response) => {
  res
    .status(404)
    .json({ success: false, message: "Route not found", path: req.path });
});

export default app;
