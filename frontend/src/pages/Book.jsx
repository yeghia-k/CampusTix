import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { confirmBooking, createBooking, getEvent } from "../api";

export default function Book() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [tickets, setTickets] = useState(1);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    getEvent(id)
      .then(setEvent)
      .catch((e) => setError(e.message));
  }, [id]);

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    setStatus("Booking…");
    try {
      const booking = await createBooking({
        eventId: event.id,
        eventTitle: event.title,
        name,
        email,
        tickets: Number(tickets),
      });
      setStatus("Confirming…");
      const confirmation = await confirmBooking({
        bookingId: booking.id,
        email: booking.email,
        eventTitle: booking.eventTitle,
      });
      setStatus(`Confirmed: ${confirmation.confirmationCode}`);
      setTimeout(() => navigate("/my-bookings"), 900);
    } catch (err) {
      setError(err.message);
      setStatus("");
    }
  }

  if (error && !event) return <p className="error">{error}</p>;
  if (!event) return <p>Loading…</p>;

  return (
    <section>
      <h1>Book: {event.title}</h1>
      <form className="form" onSubmit={onSubmit}>
        <label>
          Name
          <input value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Tickets
          <input
            type="number"
            min="1"
            max="10"
            value={tickets}
            onChange={(e) => setTickets(e.target.value)}
            required
          />
        </label>
        <button className="btn" type="submit">
          Confirm booking
        </button>
      </form>
      {status && <p className="ok">{status}</p>}
      {error && <p className="error">{error}</p>}
    </section>
  );
}
