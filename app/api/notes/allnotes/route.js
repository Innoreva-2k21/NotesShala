import { connectDB } from "@/lib/db";
import Notes from "@/lib/models/NotesModel";

export const runtime = "nodejs";

export async function GET() {
  try {
    await connectDB();
    const notes = await Notes.find();
    return Response.json(notes);
  } catch (error) {
    console.error("Error in getAllNotes:", error.message);
    return Response.json({ message: error.message }, { status: 500 });
  }
}
