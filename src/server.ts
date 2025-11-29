import express, { Request, Response } from "express";
import { Pool } from "pg";
import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join(process.cwd(), ".env") });
const app = express();
const port = 5000;

//json parser
app.use(express.json());
//if need from data
// app.use(express.urlencoded());

const pool = new Pool({
  connectionString: `${process.env.CONNECTION_STR}`,
});

//DB
const initDB = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    age INT,
    phone VARCHAR(14),
    address TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
    )
        `);

  await pool.query(`
            CREATE TABLE IF NOT EXISTS todos(
            id SERIAL PRIMARY KEY,
            user_id INT REFERENCES users(id) ON DELETE CASCADE,
            title VARCHAR(200) NOT NULL,
            description TEXT,
            completed BOOLEAN DEFAULT false,
            due_date DATE,
            created_at TIMESTAMP DEFAULT NOW(),
            updated_at TIMESTAMP DEFAULT NOW()
            )
            `);
};

initDB();

app.get("/", async (req: Request, res: Response) => {
  res.send("Hello Next Level Developer !");
});

app.post("/users", async (req: Request, res: Response) => {
  const { name, email } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO users(name, email) VALUES($1, $2) RETURNING *`,
      [name, email]
    );
    console.log(result);
    res
      .status(201)
      .json({
        success: true,
        message: "inserted successful",
        data: result.rows[0],
      });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }

  res.status(200).json({ success: true, message: "Api is working" });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
