import { connectDB } from "@/lib/db";
import Notes from "@/lib/models/NotesModel";

export const runtime = "nodejs";

export async function DELETE(req, { params }) {
  try {
    await connectDB();
    const { id } = params;
    const deleted = await Notes.findByIdAndDelete(id);
    if (!deleted) {
      return Response.json({ error: "Note not found" }, { status: 404 });
    }
    return Response.json({ success: true, message: "Note deleted successfully" });
  } catch (error) {
    console.error("Error in deleteNote:", error.message);
    return Response.json({ message: error.message }, { status: 500 });
  }
}
