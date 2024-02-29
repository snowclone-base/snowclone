import { dbQuery } from "./db-query.js";

export const getAllTodoLists = async () => {
  const SQL = "SELECT * FROM todolists;";

  const result = await dbQuery(SQL);
  return result.rows;
};
