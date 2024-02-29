import { dbQuery } from "./db-query.js";

export const createTodo = async (title, done, username, todolist_id) => {
  const SQL =
    "INSERT INTO todos(title, done, username, todolist_id)" +
    "VALUES($1, $2, $3, $4);";

  const result = await dbQuery(SQL, title, done, username, todolist_id);
  return result.rows;
};
