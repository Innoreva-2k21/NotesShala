import { connectDB } from "@/lib/db";
import Notes from "@/lib/models/NotesModel";

export const runtime = "nodejs";

export async function GET(req, { params }) {
  try {
    await connectDB();
    const { branch } = params;
    const notes = await Notes.find({ branch });
    return Response.json(notes);
  } catch (error) {
    console.error("Error in getNotes:", error.message);
    return Response.json({ message: error.message }, { status: 500 });
  }
}
