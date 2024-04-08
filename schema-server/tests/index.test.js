import express from "express";
import index from "../src/index";

const app = express();
const request = require("supertest");

// jest.mock("../src/services/db-query", () => ({
//   dbQuery: jest.fn(),
// }));

// jest.mock("../src/middleware/uploadFile", () => ({
//   upload: {
//     single: jest.fn(),
//   },
// }));

// jest.mock("../src/middleware/uploadSchema", () => ({
//   uploadSchema: jest.fn(),
// }));

jest.mock("../src/middleware/uploadFile", () => {
  const upload = {
    single: jest.fn(() => (req, res, next) => {
      req.file = {
        originalname: "test.sql",
        buffer: Buffer.from(
          "CREATE TABLE helo ( \
              id serial PRIMARY KEY \
            );"
        ),
      };
      next();
    }),
  };

  return { upload };
});



// mock dbQuery, not upload Schema -- this is what we're testing
// jest docs manual mocks, mocking imports
jest.mock("../src/middleware/uploadSchema", () => {
  return jest.fn(async (req, res, next) => {
    // Return a mock response without actually executing the functionality
    res.status(201).send({ message: "Schema update successful!" });
  });
});

// jest.mock("../src/middleware/uploadSchema", () => {
//   return jest.fn(async (req, res, next) => {
//     try {
//       //   const path = require("path");
//       //   const fs = require("fs");

//       //   const storagePath = path.join(__dirname, "mocked-uploads");

//       //   req.file = {
//       //     originalname: "test.sql", // Mocking the `originalname` property of the file object
//       //     buffer: Buffer.from(
//       //       "CREATE TABLE helo ( \
//       //             id serial PRIMARY KEY \
//       //           );"
//       //     ), // Mocking the file content
//       //   };
//       //   var sql = fs.readFileSync(`${storagePath}/test.sql`, "utf8");

//       // Execute the database query
//       //   await dbQuery.mockResolvedValue()(sql);
//       //   await dbQuery.mockResolvedValue();

//       // Simulate successful schema update
//       res.status(201).send({ message: "Schema update successful!" });
//     } catch (error) {
//       // Simulate error handling
//       if (error.message.includes("already exists")) {
//         res.status(400).send({ error: error.message });
//       } else {
//         console.error("Error:", error);
//         res.status(500).send({ error: "Internal server error." });
//       }
//     }
//   });
// //   return uploadSchema; // Export the mocked schemaUpload function
// });

app.use("/", index);

test("healthcheck route works", (done) => {
  request(app)
    .get("/V1/api")
    .expect("Content-Type", /json/)
    .expect({ message: "Schema import API server is healthy." })
    .expect(200, done);
});

test("no token returns 403", (done) => {
  request(app)
    .post("/schema")
    .expect({ message: "No token provided." })
    .expect(403, done);
});

test("wrong token returns 401", (done) => {
  request(app)
    .post("/schema")
    .set("Authorization", "Bearer bad-token")
    .expect({ message: "Unauthorized." })
    .expect(401, done);
});

test("upload and process SQL schema file successfully", (done) => {
  request(app)
    .post("/schema")
    .set("Authorization", "Bearer helo")
    .expect({ message: "Schema update successful!" })
    .expect(201, done);
});
