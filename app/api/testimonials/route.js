import mongoose from "mongoose";
import { connectDB } from "@/lib/db";
import Testimonial from "@/lib/models/TestimonialModel";

export const runtime = "nodejs";

export async function GET() {
  try {
    await connectDB();
    const testimonials = await Testimonial.find({});
    return Response.json({ success: true, testimonials });
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    return Response.json(
      { success: false, message: "Error fetching testimonials", error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const { fullname, email, message, picture } = body;
    await Testimonial.create({ fullname, email, message, picture });
    return Response.json({ success: true, message: "Message sent successfully" });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      const errorList = Object.values(error.errors).map((e) => e.message);
      return Response.json({ success: false, error: errorList.join(". ") }, { status: 400 });
    }
    console.error("Error creating testimonial:", error);
    return Response.json({ success: false, message: "Unable to send message." }, { status: 500 });
  }
}
