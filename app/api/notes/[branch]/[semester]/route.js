import { connectDB } from "@/lib/db";
import Notes from "@/lib/models/NotesModel";

export const runtime = "nodejs";

export async function GET(req, { params }) {
  try {
    await connectDB();
    const { branch, semester } = params;
    const notes = await Notes.find({ branch, semester });
    return Response.json(notes);
  } catch (error) {
    console.error("Error in getNotesSem:", error.message);
    return Response.json({ message: error.message }, { status: 500 });
  }
}
