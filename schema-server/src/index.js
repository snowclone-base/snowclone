import "dotenv/config.js";
import cors from "cors";
import express from "express";
import fs from "fs";
import multer from "multer";
import path from "path";

import { dbQuery } from "./services/db-query.js";

// utils to create path to file
import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const storagePath = path.join(__dirname, "tmp", "my-uploads");

const app = express();
app.use(express.json());
app.use(cors());

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

app.post("/schema", upload.single("file"), async (req, res) => {
  // example curl request for uploading a file, @test.sql represent the local path
  // curl -F 'file=@test.sql' http://localhost:5175/schema

  var sql = fs.readFileSync(`${storagePath}/${req.file.originalname}`, "utf8");

  await dbQuery(sql);
  res.status(201).send({message: "Schema update successful!"});
});

// healthcheck path
app.get("/V1/api", (req, res) => {
  res.send("You made it!");
});

app.listen(5175, () => {
  console.log(`Schema import API server listening on port 5175!`);
});
