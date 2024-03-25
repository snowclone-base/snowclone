import "dotenv/config.js";
import cors from "cors";
import express from "express";
import fs from "fs";

import verifyToken from "./middleware/verifyToken.js";
import { upload, storagePath } from "./middleware/uploadFile.js";

import { dbQuery } from "./services/db-query.js";

const app = express();
app.use(express.json());
app.use(cors());

app.post("/schema", verifyToken, upload.single("file"), async (req, res) => {
  try {
    // Read the SQL file
    var sql = fs.readFileSync(`${storagePath}/${req.file.originalname}`, "utf8");

    // Execute the database query
    await dbQuery(sql);
    
    // Send success response
    res.status(201).send({ message: "Schema update successful!" });
  } catch (error) {
    // Check if the error message indicates the relation already exists
    if (error.message.includes("already exists")) {
      // Send a client-friendly error message
      res.status(400).send({ error: error.message });
    } else {
      // If it's another type of error, send a generic error message
      console.error("Error:", error);
      res.status(500).send({ error: "Internal server error." });
    }
  }
});

// healthcheck path
app.get("/V1/api", (req, res) => {
  res.status(200).send({ message: "Schema import API server is healthy." });
});

app.listen(5175, () => {
  console.log(`Schema import API server listening on port 5175!`);
});
