import express, { Request, Response } from "express";
import { pool } from "../../config/db";
import { userControllers } from "./user.controller";
const router = express.Router();

//app.use("/users", userRoutes)

// routes -> controller -> service

//router app.post("/users  ayta hocche users er root route"/" root path")
router.post("/", userControllers.createUser);

// users get root route "/" root path
router.get("/", async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`SELECT * FROM users`);
    res.status(200).send({
      success: true,
      message: "Data retrieved successfully",
      data: result.rows,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export const userRoutes = router;
