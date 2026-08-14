const express = require("express");
const cors = require("cors");
const crypto = require("crypto");

const app = express();
const PORT = process.env.PORT || 4002;

/** In-memory store for demo (resets when the container restarts). */
const bookings = [];

app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ ok: true, service: "booking-api" });
});

app.get("/bookings", (_req, res) => {
  res.json(bookings);
});

app.post("/bookings", (req, res) => {
  const { eventId, eventTitle, name, email, tickets } = req.body || {};

  if (!eventId || !name || !email || !tickets) {
    return res.status(400).json({
      error: "eventId, name, email, and tickets are required",
    });
  }

  const booking = {
    id: crypto.randomUUID(),
    eventId: String(eventId),
    eventTitle: eventTitle || "Event",
    name: String(name),
    email: String(email),
    tickets: Number(tickets),
    createdAt: new Date().toISOString(),
  };

  bookings.unshift(booking);
  res.status(201).json(booking);
});

app.listen(PORT, () => {
  console.log(`booking-api listening on ${PORT}`);
});
