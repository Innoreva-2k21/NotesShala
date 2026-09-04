import { connectDB } from "@/lib/db";
import Notes from "@/lib/models/NotesModel";

export const runtime = "nodejs";

export async function GET(req, { params }) {
  try {
    await connectDB();
    const { email } = params;
    const notes = await Notes.find({ postedBy: email });
    return Response.json(notes);
  } catch (error) {
    console.error("Error in getNotesByUser:", error.message);
    return Response.json({ message: error.message }, { status: 500 });
  }
}
