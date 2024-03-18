import { redirect } from "@remix-run/node";
import { Form, useNavigate } from "@remix-run/react";
import mongoose from "mongoose";
import { useState } from "react";
import { authenticator } from "../services/auth.server";


export const meta = () => {
  return [{ title: "Cooking classes - Add New Event" }];
};

// This loader will check if the user is authenticated
export async function loader({ request }) {
  return await authenticator.isAuthenticated(request, {
    failureRedirect: "/signin",
  });
}

// This is the form to add a new event
export default function AddEvent() {
  const [image, setImage] = useState("https://placehold.co/600x400?text=Add+your+amazing+image");
  const navigate = useNavigate();

  function handleCancel() {
    navigate(-1);
  }

  return (
    <div className="page">
      <h1>Add an Event</h1>
      <Form id="event-form" method="post">
      <div className="form-row">
      <div className="form-column">

        <label htmlFor="title">Title</label>
        <input id="title" name="title" type="text" placeholder="Event Title..." />

        <label htmlFor="caption">Caption</label>
        <input id="caption" name="caption" type="text" aria-label="caption" placeholder="Write a caption..." />

        <label htmlFor="date">Date</label>
        <input id="date" name="date" type="date" />

        <label htmlFor="time">Time</label>
        <input id="time" name="time" type="time" />
        </div>

        <div className="form-column">
        <label htmlFor="location">Location</label>
        <input id="location" name="location" type="text" placeholder="Event Location..." />

        <label htmlFor="image">Image URL</label>
        <input name="image" type="url" onChange={e => setImage(e.target.value)} placeholder="Paste an image URL..." />

        <label htmlFor="image-preview">Image Preview</label>
        <img
          id="image-preview"
          className="image-preview"
          src={image ? image : "https://placehold.co/600x400?text=Paste+an+image+URL"}
          alt="Choose"
          onError={e => (e.target.src = "https://placehold.co/600x400?text=Error+loading+image")}
        />
        </div>
        </div>

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

export async function action({ request }) {
  const formData = await request.formData();
  const event = Object.fromEntries(formData);

   // Get the authenticated user
   const user = await authenticator.isAuthenticated(request, {
    failureRedirect: "/signin"
  });
  console.log(user);
  // Add the authenticated user's id to the event.user field
  event.user = user._id;
  // Save the event to the database

  await mongoose.models.Event.create(event);

  return redirect("/events");
}