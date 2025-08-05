import express from "express";
import notesRoutes from "./notesRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";

const app = express();
const PORT = process.env.PORT || 5001;

dotenv.config();

connectDB();

//middleware

app.use(express.json());

app.use("/api/notes", notesRoutes);

app.listen(PORT, () => {
  console.log("Server started on port:", PORT);
});
