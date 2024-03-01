import "dotenv/config";
import { WebSocketServer } from "ws";
import createSubscriber from "pg-listen";

const wss = new WebSocketServer({ port: 8080 });
const subscriber = createSubscriber({
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  database: process.env.PG_DATABASE,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
});

wss.on("connection", (ws) => {
  ws.on("message", (message) => {
    console.log(`Received message: ${message}`);
  });
});

subscriber.notifications.on("todos_change", (payload) => {
  // Payload as passed to subscriber.notify() -> must pass payload as JSON
  console.log("Received notification in 'todos_change':", payload);
  wss.clients.forEach((client) => {
    client.send(JSON.stringify(payload));
  });
});

subscriber.events.on("error", (error) => {
  console.error("Fatal database connection error:", error);
  process.exit(1);
});

process.on("exit", () => {
  subscriber.close();
});

await subscriber.connect();
await subscriber.listenTo("todos_change");
