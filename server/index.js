import express from "express";
import bodyParser from "body-parser"; // untuk mengurai data permintaan HTTP
import mongoose from "mongoose";
import cors from "cors"; // untuk mengatasi masalah kebijakan lintas sumber daya
import dotenv from "dotenv";
import multer from "multer"; // untuk menangani unggahan file
import helmet from "helmet"; // untuk meningkatkan keamanan aplikasi
import morgan from "morgan"; // untuk pencatatan permintaan HTTP
import path from "path";
import { fileURLToPath } from "url"; // utilitas Node.js untuk mengonversi URL menjadi jalur file lokal

import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import authRoutes from "./routes/auth.js";
import { register } from "./controllers/auth.js";
import { createPost } from "./controllers/posts.js";
import { verifyToken } from "./middleware/auth.js";

// ==== Konfigurasi middleware ====
// Mengonfigurasi agar bisa mengakses direktori dan file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config(); // Memuat variabel lingkungan dari file .env
const app = express();

// Konfigurasi middleware dalam Express
app.use(express.json()); // Menggunakan middleware untuk mengurai body permintaan JSON
app.use(helmet()); // Menggunakan Helmet untuk meningkatkan keamanan aplikasi
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" })); // Mengatur kebijakan lintas sumber daya pada Helmet
app.use(morgan("common")); // Menggunakan Morgan untuk pencatatan permintaan HTTP
app.use(bodyParser.json({ limit: "30mb", extended: true })); // Menggunakan body-parser untuk mengurai JSON dengan batasan ukuran
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true })); // Menggunakan body-parser untuk mengurai data URL-encoded dengan batasan ukuran
app.use(cors()); // Menggunakan CORS untuk mengatasi masalah kebijakan lintas sumber daya
app.use("/assets", express.static(path.join(__dirname, "public/assets"))); // Mengatur rute untuk menyajikan konten statis dari direktori "public/assets"

// ==== Konfigurasi storage menggunakan multer
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "public/assets");
  },
  filename(req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

// ==== Routes dengan file (berupa gambar)
app.post("/auth/register", upload.single("picture"), register);
app.post("/posts", verifyToken, upload.single("picture"), createPost);

// ==== Routes
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

// ==== Mongoose setup
const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(
    app.listen(PORT, () => {
      console.log(`server running on port ${PORT}`);
    })
  )
  .catch((error) => console.error(`${error} did not connect`));
