import "dotenv/config";
import http from "http";
import { EventEmitter } from "events";
import createSubscriber from "pg-listen";

const sseEmitter = new EventEmitter();

const server = http.createServer((req, res) => {

  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    "Connection": "keep-alive",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization" 
  });

  const listener = (payload) => {
    res.write(`data: ${JSON.stringify(payload)}\n\n`);
  };

  sseEmitter.on("todos_change", listener);

  req.on("close", () => {
    sseEmitter.off("todos_change", listener);
  });
});

server.listen(8080);


const subscriber = createSubscriber({
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  database: process.env.PG_DATABASE,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
});

subscriber.notifications.on("todos_change", (payload) => {
  sseEmitter.emit("todos_change", payload);
});

subscriber.events.on("error", (error) => {
  console.error("Fatal database connection error:", error);
  process.exit(1);
});

process.on("exit", () => {
  subscriber.close();
});

subscriber.connect().then(() => {
  subscriber.listenTo("todos_change");
}).catch((error) => {
  console.error("Error connecting to PostgreSQL:", error);
  process.exit(1);
});
