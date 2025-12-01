import express, { NextFunction, Request, Response } from "express";
import config from "./config";
import initDB, { pool } from "./config/db";

const app = express();
const port = config.port;

//json parser
app.use(express.json());
//if need from data
// app.use(express.urlencoded());

initDB();

//logger middleware
const logger = (req: Request, res: Response, next: NextFunction) => {
  console.log(
    `[${new Date().toISOString()}] method ${req.method} path ${req.path}`
  );
  next();
};

app.get("/", logger, async (req: Request, res: Response) => {
  res.send("Hello Next Level Developer !");
});

//user CRUD
//get all users route
app.get("/users", async (req: Request, res: Response) => {
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

//get single user by id
app.get("/users/:id", async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`SELECT * FROM users WHERE id = $1`, [
      Number(req.params.id),
    ]);
    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      message: "user fetched successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

//users post route
app.post("/users", async (req: Request, res: Response) => {
  const { name, email } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO users(name, email) VALUES($1, $2) RETURNING *`,
      [name, email]
    );
    res.status(201).json({
      success: true,
      message: "inserted successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

//update single user
app.put("/users/:id", async (req: Request, res: Response) => {
  const { name, email } = req.body;
  try {
    const result = await pool.query(
      `UPDATE users SET name=$1, email=$2 WHERE id=$3 RETURNING *`,
      [name, email, req.params.id]
    );
    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      message: "user updated successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

//delete single user
app.delete("/users/:id", async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`DELETE FROM users WHERE id = $1`, [
      Number(req.params.id),
    ]);
    console.log(result);
    if (result.rowCount === 0) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      message: "User delete successfully",
      data: null,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

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
