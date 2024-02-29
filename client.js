import "dotenv/config";
import createSubscriber from "pg-listen";

const subscriber = createSubscriber({
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  database: process.env.PG_DATABASE,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
});

subscriber.notifications.on("todos_change", (payload) => {
  // Payload as passed to subscriber.notify() -> must pass payload as JSON
  console.log("Received notification in 'todos_change':", payload);
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