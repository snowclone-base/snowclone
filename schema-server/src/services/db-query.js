// read up on pg.query docs to see about making returned data format prettier
// import { Client } from "pg";
import pkg from "pg";
const { Client } = pkg;
import "dotenv/config";

const CONNECTION = {
  connectionString: process.env.DATABASE_URL,
};

export const dbQuery = async (statement, ...parameters) => {
  let client = new Client(CONNECTION);

  await client.connect();
  // logQuery(statement, parameters);
  let result = await client.query(statement, parameters);
  await client.end();

  return result;
};
