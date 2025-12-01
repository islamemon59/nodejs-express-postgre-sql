import express, { Request, Response } from "express";
import config from "./config";
import initDB, { pool } from "./config/db";
import logger from "./middleware/logger";
import { userRoutes } from "./modules/user/user.routes";

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
//users route
app.use("/users", userRoutes);


//todos CRUD
//get all todos
app.get("/todos", async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`SELECT * FROM todos`);
    res.status(200).send({
      success: true,
      message: "Data retrieved successfully",
      data: result.rows,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});
//create todo
app.post("/todos", async (req: Request, res: Response) => {
  const { user_id, title } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO todos(user_id, title) VALUES($1, $2) RETURNING *`,
      [user_id, title]
    );

    res
      .status(200)
      .json({ success: true, message: "Todo created", data: result.rows[0] });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.use((req: Request, res: Response) => {
  res
    .status(404)
    .json({ success: false, message: "Route not found", path: req.path });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
