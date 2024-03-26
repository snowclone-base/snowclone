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

// Heartbeat interval in milliseconds
const HEARTBEAT_INTERVAL = 59000; // 59 seconds.
const HEADERS = {
  "Content-Type": "text/event-stream",
  "Cache-Control": "no-cache",
  Connection: "keep-alive",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

function sendHeartbeat(res) {
  res.write(":\n\n");
}

app.get("/", (req, res) => {
  res.sendStatus(200);
});

app.get("/realtime", (req, res) => {
  res.writeHead(200, HEADERS);

  const sendUpdates = (payload) => {
    res.write(`data: ${JSON.stringify(payload)}\n\n`);
  };

  sseEmitter.on("db_changes", sendUpdates);

  // Send heartbeat at intervals
  const intervalId = setInterval(() => {
    sendHeartbeat(res);
  }, HEARTBEAT_INTERVAL);

  // Stop sending heartbeat when the client closes connection
  req.on("close", () => {
    clearInterval(intervalId);
    sseEmitter.off("db_changes", sendUpdates);
  });
});

app.listen(8080, () => {
  console.log("Event server is running on port 8080");
});
