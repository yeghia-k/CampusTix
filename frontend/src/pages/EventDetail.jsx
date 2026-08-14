import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getEvent } from "../api";

export default function EventDetail() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    getEvent(id)
      .then(setEvent)
      .catch((e) => setError(e.message));
  }, [id]);

  if (error) return <p className="error">{error}</p>;
  if (!event) return <p>Loading…</p>;

  return (
    <section className="detail">
      <img src={event.imageUrl} alt={event.title} />
      <div>
        <h1>{event.title}</h1>
        <p>
          {event.date} · {event.venue}
        </p>
        <p>{event.description}</p>
        <p className="price">€{event.price} per ticket</p>
        <Link className="btn" to={`/book/${event.id}`}>
          Book tickets
        </Link>
      </div>
    </section>
  );
}
