import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    title: {
      types: String,
      require: true,
    },
    content: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

const Note = mongoose.model("Note", noteSchema);

export default Note;
