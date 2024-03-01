import "dotenv/config";
import cors from "cors";
import express from "express";
import fs from "fs";
import multer from "multer";
import path from "path";

import { getAllTodoLists } from "./services/getAllTodoLists.js";
import { createTodoList } from "./services/createTodoList.js";
import { createTodo } from "./services/createTodo.js";
import { dbQuery } from "./services/db-query.js";

// utils to create path to file
import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const storagePath = path.join(__dirname, "tmp", "my-uploads");

const app = express();

// tell multer where to store the file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, storagePath);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

app.use(express.json());
app.use(cors());

// app.use("/V1/api/", routes.api);
app.post("/schema", upload.single("file"), async (req, res) => {
  // example curl request for uploading a file, @test.sql represent the local path
  // curl -F 'file=@test.sql' http://localhost:5175/schema

  var sql = fs.readFileSync(`${storagePath}/${req.file.originalname}`, "utf8");

  await dbQuery(sql);
  res.status(201).send({message: "Schema updated :3"});
});

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
