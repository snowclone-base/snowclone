import "dotenv/config";
import cors from "cors";
import express from "express";
import { getAllTodoLists } from "./services/getAllTodoLists.js";
import { createTodoList } from "./services/createTodoList.js";
import { createTodo } from "./services/createTodo.js";
const app = express();

app.use(express.json());
app.use(cors());

// app.use("/V1/api/", routes.api);

app.get("/V1/api", (req, res) => {
  res.send("You made it!");
});

app.get("/V1/api/todolists", async (req, res) => {
  // Select all from Todolists
  let todos = await getAllTodoLists();
  res.json(todos);
});

app.post("/V1/api/todolists", async (req, res) => {
  //CREATE A NEW TODOLIST

  await createTodoList(req.body.title, req.body.username);
  res.status(201).json({ message: "You done did it." });
});

app.post("/V1/api/todos", async (req, res) => {
  //CREATE A NEW TODO

  await createTodo(
    req.body.title,
    req.body.done,
    req.body.username,
    req.body.todolist_id
  );
  res.status(201).json({ message: "You done did it." });
});

app.listen(process.env.PORT, () => {
  console.log(`RELAY listening on port ${process.env.PORT} !`);
});
