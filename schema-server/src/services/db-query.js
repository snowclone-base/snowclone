// read up on pg.query docs to see about making returned data format prettier
// import { Client } from "pg";
import pkg from "pg";
const { Client } = pkg;
import "dotenv/config";

const { PG_USER, PG_PASSWORD, PG_HOST, PG_PORT, PG_DATABASE } = process.env;

const CONNECTION = {
  user: PG_USER,
  password: PG_PASSWORD,
  host: PG_HOST,
  port: PG_PORT,
  database: PG_DATABASE,
};

export const dbQuery = async (statement, ...parameters) => {
  try {
    let client = new Client(CONNECTION);

    await client.connect();
    // logQuery(statement, parameters);
    let result = await client.query(statement, parameters);
    await client.end();

    return result;
  } catch (error) {
    // Handle any errors that occur during database query execution
    console.error("Error executing database query:", error);
    throw error; // Re-throw the error to propagate it to the caller
  }
};
