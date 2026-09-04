import mongoose from "mongoose";

const NotesSchema = new mongoose.Schema(
  {
    postedBy: { type: String, required: true },
    branch: { type: String },
    semester: { type: String },
    subject: { type: String },
    file: { type: String },
    fileName: { type: String },
  },
  { timestamps: true }
);

const Notes = mongoose.models.notes || mongoose.model("notes", NotesSchema);

export default Notes;
