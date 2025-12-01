import { Request, Response } from "express";
import { todoServices } from "./todo.service";

// create todo
const createTodo = async (req: Request, res: Response) => {
  const { user_id, title } = req.body;
  try {
    const result = await todoServices.createTodo(user_id, title);

    res
      .status(200)
      .json({ success: true, message: "Todo created", data: result.rows[0] });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// get todos
const getTodo = async (req: Request, res: Response) => {
  try {
    const result = await todoServices.getTodo();
    res.status(200).send({
      success: true,
      message: "Data retrieved successfully",
      data: result.rows,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const todoControllers = {
  createTodo,
  getTodo,
};
