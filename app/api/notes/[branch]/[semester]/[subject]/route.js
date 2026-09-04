import { connectDB } from "@/lib/db";
import Notes from "@/lib/models/NotesModel";

export const runtime = "nodejs";

export async function GET(req, { params }) {
  try {
    await connectDB();
    const { branch, semester, subject } = params;
    const notes = await Notes.find({ branch, semester, subject });
    if (notes.length === 0) {
      return Response.json({ error: "Notes not found" }, { status: 404 });
    }
    return Response.json(notes);
  } catch (error) {
    console.error("Error in getNotesSemSub:", error.message);
    return Response.json({ message: error.message }, { status: 500 });
  }
}
