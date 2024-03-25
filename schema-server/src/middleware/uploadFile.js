// src/middleware/uploadMiddleware.js
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

// utils to create path to file
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const storagePath = path.join(__dirname, "..", "tmp", "my-uploads");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, storagePath);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

export { upload, storagePath };

