import express from "express";
import { todoControllers } from "./todo.controller";
const router = express.Router();

// create todo
router.post("/", todoControllers.createTodo);

// get todos
router.get("/", todoControllers.getTodo);

export const todoRouters = router;
