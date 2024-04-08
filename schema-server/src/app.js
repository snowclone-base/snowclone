// app.js
import express from "express";
import cors from "cors";
import index from "./index";

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use("/", index);

app.listen(5175, () => {
  console.log(`Schema import API server listening on port 5175!`);
});
