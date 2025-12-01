import { pool } from "../../config/db";

const createTodo = async (id: number, title: string) => {
  const result = await pool.query(
    `INSERT INTO todos(user_id, title) VALUES($1, $2) RETURNING *`,
    [id, title]
  );
  return result;
};

const getTodo = async () => {
  const result = await pool.query(`SELECT * FROM todos`);
  return result;
};

export const todoServices = {
  createTodo,
  getTodo,
};
