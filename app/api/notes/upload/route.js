import { connectDB, cloudinary } from "@/lib/db";
import Notes from "@/lib/models/NotesModel";

export const runtime = "nodejs";

export async function POST(req) {
  try {
    await connectDB();

    const form = await req.formData();
    const file = form.get("file");
    const postedBy = form.get("postedBy");
    const branch = form.get("branch");
    const semester = form.get("semester");
    const subject = form.get("subject");

    if (!postedBy || !file) {
      return Response.json(
        { message: "PostedBy and file upload are required fields." },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const uploadResult = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "noteshaala_notes",
          resource_type: "auto",
          public_id: `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`,
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );
      stream.end(buffer);
    });

    const newNote = await Notes.create({
      postedBy,
      branch,
      semester,
      subject,
      file: uploadResult.secure_url,
      fileName: file.name,
    });

    return Response.json(newNote, { status: 200 });
  } catch (error) {
    console.error("Error in uploadNotes:", error.message);
    return Response.json(
      { message: error.message || "Server error while uploading notes." },
      { status: 500 }
    );
  }
}
