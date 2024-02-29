import { dbQuery } from "./db-query.js";

export const createTodoList = async (title, username) => {
  const SQL = "INSERT INTO todolists(title, username)" + "VALUES($1, $2);";

  const result = await dbQuery(SQL, title, username);
  return result.rows;
};
