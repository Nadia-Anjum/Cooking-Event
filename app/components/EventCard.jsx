export default function EventCard({ event }) {
  return (
    <article className="event-card">
      <h2>{event.title}</h2>
      <img src={event.image} alt={event.caption} />
      <p>Event by: {event.user ? `${event.user.name} ${event.user.lastname}` : 'Unknown'}</p>
      <h3>{event.caption}</h3>
      <p>{event.date}, {event.time}</p>
      <p>{event.location}</p>
    </article>
  );
}
