import "dotenv/config.js";
import express from "express";

import verifyToken from "./middleware/verifyToken.js";
import uploadSchema from "./middleware/uploadSchema.js";
import { upload } from "./middleware/uploadFile.js";

const index = express.Router();

index.post("/schema", verifyToken, upload.single("file"), uploadSchema);

// healthcheck path
index.get("/V1/api", (req, res) => {
  res.status(200).send({ message: "Schema import API server is healthy." });
});

export default index;
