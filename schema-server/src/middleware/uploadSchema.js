import fs from "fs";
import { dbQuery } from "../services/db-query.js";
import { storagePath } from "./uploadFile.js";

// optional third param, default use import,
async function uploadSchema(req, res) {
  try {
    // Read the SQL file
    var sql = fs.readFileSync(
      `${storagePath}/${req.file.originalname}`,
      "utf8"
    );

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
    //   console.error("Error:", error.message);
      res.status(500).send({ error: error.message });
    }
  }
}

export default uploadSchema;
