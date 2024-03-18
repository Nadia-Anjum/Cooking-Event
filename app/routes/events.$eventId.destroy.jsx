import { redirect } from "@remix-run/node";
import mongoose from "mongoose";

// This action will delete the event and redirect to /events
export async function action({ params }) {
  await mongoose.models.Event.findByIdAndDelete(params.eventId).populate("user"); 
  return redirect("/events"); 
}
