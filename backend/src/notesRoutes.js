import express from "express";
import {
  createNotes,
  deleteNotes,
  getAllNotes,
  getNoteById,
  updateNotes,
} from "./notesController.js";

const router = express.Router();
// express.Router() is like a mini Express app that only handles routes related to notes.
// You can define:
// router.get() → for reading data
// router.post() → for creating data
// router.put() → for updating data
// router.delete() → for deleting data

router.get("/", getAllNotes);
router.get("/:id", getNoteById);
router.post("/", createNotes);
router.put("/:id", updateNotes);
router.delete("/:id", deleteNotes);

export default router;
