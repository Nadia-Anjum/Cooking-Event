import { json, redirect } from "@remix-run/node";
import { Form, useLoaderData, useNavigate } from "@remix-run/react";
import mongoose from "mongoose";
import { useState } from "react";
import { authenticator } from "../services/auth.server";


export async function loader({ params, request }) {
  await authenticator.isAuthenticated(request, {
    failureRedirect: "/signin",
  });

  const event = await mongoose.models.Event.findById(params.eventId).populate("user");
  return json({ event });
}

export default function UpdateEvent() {
  const { event } = useLoaderData();
  const [image, setImage] = useState(event.image);
  const navigate = useNavigate();

  function handleCancel() {
    navigate(-1);
  }

  return (
    <div className="page">
      <h1>Update Post</h1>
      <Form id="event-form" method="post">
      <div className="form-row">
      <div className="form-column">

      <label htmlFor="title">Title</label>
      <input id="title" name="title" type="text" defaultValue={event.title} placeholder="Event Title..." />

        <label htmlFor="caption">Caption</label>
        <input
          id="caption"
          defaultValue={event.caption}
          name="caption"
          type="text"
          aria-label="caption"
          placeholder="Write a caption..."
        />

        <label htmlFor="date">Date</label>
        <input id="date" name="date" type="date" defaultValue={event.date} />

        <label htmlFor="time">Time</label>
        <input id="time" name="time" type="time" defaultValue={event.time} />
        </div>


        <div className="form-column">
        <label htmlFor="location">Location</label>
        <input id="location" name="location" type="text" defaultValue={event.location} placeholder="Event Location..." />

        <label htmlFor="image">Image URL</label>
        <input
          name="image"
          defaultValue={event.image}
          type="url"
          onChange={(e) => setImage(e.target.value)}
          placeholder="Paste an image URL..."
        />

        <label htmlFor="image-preview">Image Preview</label>
        <img
          id="image-preview"
          className="image-preview"
          src={image ? image : "https://placehold.co/600x400?text=Paste+an+image+URL"}
          alt="Choose"
          onError={(e) => (e.target.src = "https://placehold.co/600x400?text=Error+loading+image")}
        />
        </div>
        </div>


        <input name="uid" type="text" defaultValue={event.uid} hidden />
        <div className="btns">
          <button>Save</button>
          <button type="button" className="btn-cancel" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request, params }) {
  
  const authUser = await authenticator.isAuthenticated(request, {
    failureRedirect: "/signin",
  });

  // Fetch the event to check if the current user is the creator
  const eventToUpdate = await mongoose.models.Event.findById(params.eventId);

  if (eventToUpdate.user.toString() !== authUser._id.toString()) {
    // User is not the creator of the event, redirect
    return redirect(`/events/${params.eventId}`);
  }

  const formData = await request.formData();
  const event = Object.fromEntries(formData);

  eventToUpdate.caption = event.caption;
  eventToUpdate.image = event.image;
  eventToUpdate.location = event.location;
  eventToUpdate.time = event.time;
  eventToUpdate.date = event.date;
  eventToUpdate.title = event.title;

  await eventToUpdate.save();

  return redirect(`/events/${params.eventId}`);
}