import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getEvents } from "../api";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getEvents()
      .then(setEvents)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading events…</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <section>
      <h1>Events</h1>
      <div className="grid">
        {events.map((event) => (
          <article key={event.id} className="card">
            <img src={event.imageUrl} alt={event.title} />
            <div className="card-body">
              <h2>{event.title}</h2>
              <p>
                {event.date} · {event.venue}
              </p>
              <p className="price">€{event.price}</p>
              <Link className="btn small" to={`/events/${event.id}`}>
                Details
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
