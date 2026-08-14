import { useEffect, useState } from "react";
import { getBookings } from "../api";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBookings()
      .then(setBookings)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading bookings…</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <section>
      <h1>My Bookings</h1>
      {bookings.length === 0 ? (
        <p>No bookings yet. Book an event to see it here.</p>
      ) : (
        <ul className="list">
          {bookings.map((b) => (
            <li key={b.id}>
              <strong>{b.eventTitle}</strong> — {b.name} ({b.email}) ·{" "}
              {b.tickets} ticket(s)
              <div className="muted">{new Date(b.createdAt).toLocaleString()}</div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
