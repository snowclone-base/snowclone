import "dotenv/config";
import express from "express";
import cors from "cors";
import { EventEmitter } from "events";
import createSubscriber from "pg-listen";

const app = express();
app.use(cors());

const sseEmitter = new EventEmitter();

const subscriber = createSubscriber({
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  database: process.env.PG_DATABASE,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
});

subscriber.notifications.on("db_changes", (payload) => {
  sseEmitter.emit("db_changes", payload);
});

subscriber.events.on("error", (error) => {
  console.error("Fatal database connection error:", error);
  process.exit(1);
});

process.on("exit", () => {
  subscriber.close();
});

subscriber
  .connect()
  .then(() => {
    subscriber.listenTo("db_changes");
  })
  .catch((error) => {
    console.error("Error connecting to PostgreSQL:", error);
    process.exit(1);
  });

app.get("/", (req, res) => {
  res.sendStatus(200);
});

app.get("/realtime", (req, res) => {
  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  });

  const listener = (payload) => {
    res.write(`data: ${JSON.stringify(payload)}\n\n`);
  };

  sseEmitter.on("db_changes", listener);

  req.on("close", () => {
    sseEmitter.off("db_changes", listener);
  });
});

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
