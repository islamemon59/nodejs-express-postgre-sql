import express, { Request, Response } from "express";
import { Pool } from "pg";
const app = express();
const port = 5000;

//json parser
app.use(express.json());
//if need from data
// app.use(express.urlencoded());

const pool = new Pool({
  connectionString: `postgresql://neondb_owner:npg_KzMu42yWEwYt@ep-cool-dream-ad2jopvo-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require`,
});

//DB
const initDB = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXIST users(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    age INT,
    phone VARCHAR(14),
    address TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    )
        `);
};

initDB();

app.get("/", (req: Request, res: Response) => {
  res.send("Hello Next Level Developer !");
});

app.post("/", (req: Request, res: Response) => {
  console.log(req.body);
  res.status(200).json({ success: true, message: "Api is working" });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
