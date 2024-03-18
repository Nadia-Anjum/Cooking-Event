import { json, redirect } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import mongoose from "mongoose";
import EventCard from "../components/EventCard";
import { authenticator } from "../services/auth.server";
import { sessionStorage } from "../services/session.server";
import { Link } from "react-router-dom";



export async function loader({ request, params }) {
  
  let authUser = null;
  // Check if the user is authenticated
  try {
    authUser = await authenticator.isAuthenticated(request);
  } catch (error) {
    console.error(error);
  }

  // Load the event and the user who created it
  const event = await mongoose.models.Event.findById(params.eventId).populate("user").populate("attendees").populate({
    path: 'comments.user',
    model: 'User'
  })
  .exec();

  // Load similar events created by the same user
  const similarEvents = await mongoose.models.Event.find({ user: event.user._id }).populate('user').limit(5).exec();

  return json({ event, authUser, similarEvents });
}

export default function Event() {
  const { event, authUser, similarEvents } = useLoaderData();
  console.log("EVENT",event);

  function confirmDelete(event) {
    const response = confirm("Please confirm you want to delete this post event.");
    if (!response) {
      event.preventDefault();
    }
  }

  return (
    <div id="event-page" className="page page2">
      <div className="column1">
      <EventCard event={event} />
      {authUser && authUser._id === event.user._id && (
        <div className="btns">
          <Form action="update">
            <button>Update</button>
          </Form>
          <Form action="destroy" method="post" onSubmit={confirmDelete}>
            <button>Delete</button>
          </Form>
        </div>
      )}
      </div>


      <div className="column2">
        <div className="att-main">

      <div className="attend-container">
        <h2>Join Now: Get Involved in This Event!</h2>
        <p>Get ready to tantalize your taste buds! Whether you are a seasoned chef or just love good food, join our thrilling cooking event now!</p>
        {authUser && event.attendees && !event.attendees.includes(authUser._id) && (
          <Form action="" method="post">
            <button>Join here</button>
          </Form>
        )}
      </div>
      <ul className="att-outcome">
        <h2>Attendees</h2>
        {event.attendees && event.attendees.map(user => (
          <li key={user._id}>{user.name} {user.lastname}</li>
        ))}
      </ul>

      </div>


      <div className="comment-section">
        <h2>Comments</h2>
        {authUser && (
          <Form action="" method="post">
            <textarea name="content" required></textarea>
            <button type="submit">Post Comment</button>
          </Form>
        )}
        <ul className="comment-outcome-ul">
          {event.comments.map((comment, index) => (
            <li key={index} className="comment-info">
              <p>{comment.content}</p>
              <p>Posted by: {comment.user ? `${comment.user.name}` : 'Unknown'}</p>
              <p style={{ textAlign: 'end' }}>Posted at: {new Date(comment.createdAt).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      </div>
      </div>

      <div className="similar-events-main">
        <h2 className="s-h2">Similar Events</h2>
        <div className="similar-events">
          {similarEvents.map(similarEvent => (
            <Link to={`/events/${similarEvent._id}`} key={similarEvent._id}>
              <EventCard event={similarEvent} />
            </Link>
          ))}
        </div> 
      </div>

    </div>
  );
}

export async function action({ request, params }) {
  const session = await sessionStorage.getSession(request.headers.get("Cookie"));

  const authUser = session.get("user");
  const eventId = params.eventId;

  if (!authUser) {
    return redirect("/login");
  }

  const User = mongoose.models.User;
  const Event = mongoose.models.Event;

  const user = await User.findById(authUser._id);
  const event = await Event.findById(eventId);

  if (request.method === 'POST') {
    const formData = await request.formData();
    const content = formData.get('content');

    if (content) { // If the form has a 'content' field, it's a comment
      const Comment = mongoose.models.Comment;
      const comment = new Comment({ content, user: authUser._id, event: eventId }); // Tilknyt authUser._id til kommentaren
      await comment.save();
    
      event.comments.push(comment);
      await event.save();
    }
  }

  // Always allow attendance, regardless of request method
  if (event.attendees && !event.attendees.includes(authUser._id)) {
    event.attendees.push(authUser._id);
    await event.save();
  }

  if (user.eventsAttending && !user.eventsAttending.includes(eventId)) {
    user.eventsAttending.push(eventId);
    await user.save();
  }

  return redirect(`/events/${eventId}`);
}