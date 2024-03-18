import { Form, useLoaderData } from "@remix-run/react";
import { authenticator } from "../services/auth.server";
import mongoose from "mongoose";
import { json } from "@remix-run/node";
import EventCard from "../components/EventCard";
import { redirect } from "@remix-run/node";
import { Link } from "react-router-dom";


export async function loader({ request }) {
  // Get the authenticated user
  const authUser = await authenticator.isAuthenticated(request, {
    failureRedirect: "/signin",
  });

  // Fetch the user from the database and populate eventsAttending
  const user = await mongoose.models.User.findById(authUser._id)
  .populate('eventsAttending');

  // Get all events where the user field matches the authenticated user's ID
  const events = await mongoose.models.Event.find({ user: user._id }).populate('user').exec();

  return json({ user, events });
}

export default function Profile() {
  const { user, events } = useLoaderData();

  console.log(user);

  return (
    <div className="page profileIntro">
      <h1>Profile</h1>
      <div className="profile-container">
        <div>
          <p className="profileP">
            Name: {user.name} {user.lastname} <br></br>
            Mail: {user.mail}
          </p>
        </div>

        <Form method="post">
          <button>Log out</button>
        </Form>
      </div>

      
      <h2 className="profile-header2">My added events</h2>
      
      <div className="profile-event">
      {events.map(event => (
        <Link to={`/events/${event._id}`} key={event._id}>
          <EventCard event={event} />
        </Link>
      ))}
    </div>
     

      <div id="events-attending">
        <h2 className="profile-header2">Events Attending</h2>
        <ul className="profile-event-attendings">
        { user.eventsAttending.map(event => (
            <li className="li-attendingsProfile" key={event._id}>
              <Link to={`/events/${event._id}`}>
                <h2>{event.title}</h2>
                <br></br>
                <img src={event.image} alt={event.title} />
                <br></br>
                {event.caption}
                <br></br>
                <br></br>
                {event.date}, {event.time}, {event.location} 
              </Link>
              <Form method="post">
                <input type="hidden" name="eventId" value={event._id} />
                <button type="submit" className="cancelAt">Cancel</button>
              </Form>
            </li>
          ))}
        </ul>
      </div>

      <br></br>
    </div>
  );
}

export async function action({ request }) {
  const body = new URLSearchParams(await request.text());

  if (body.has('eventId')) {
    const eventId = body.get('eventId');

    const authUser = await authenticator.isAuthenticated(request, {
      failureRedirect: "/signin",
    });

    const User = mongoose.models.User;
    const Event = mongoose.models.Event;

    const user = await User.findById(authUser._id);
    const event = await Event.findById(eventId);

    // Remove the event from the user's eventsAttending array
    user.eventsAttending = user.eventsAttending.filter(id => id.toString() !== eventId);
    await user.save();

    // Remove the user from the event's attendees array
    if (event.attendees) {
      event.attendees = event.attendees.filter(attendeeId => attendeeId.toString() !== authUser._id.toString());
      await event.save();
    }

    return redirect('/profile');
  }

  await authenticator.logout(request, { redirectTo: "/signin" });
}