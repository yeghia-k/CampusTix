const CATALOG_URL = import.meta.env.VITE_CATALOG_URL || "http://localhost:4001";
const BOOKING_URL = import.meta.env.VITE_BOOKING_URL || "http://localhost:4002";
const CONFIRM_URL =
  import.meta.env.VITE_CONFIRM_URL || "/.netlify/functions/confirm-booking";

export async function getEvents() {
  const res = await fetch(`${CATALOG_URL}/events`);
  if (!res.ok) throw new Error("Failed to load events");
  return res.json();
}

export async function getEvent(id) {
  const res = await fetch(`${CATALOG_URL}/events/${id}`);
  if (!res.ok) throw new Error("Event not found");
  return res.json();
}

export async function getBookings() {
  const res = await fetch(`${BOOKING_URL}/bookings`);
  if (!res.ok) throw new Error("Failed to load bookings");
  return res.json();
}

export async function createBooking(payload) {
  const res = await fetch(`${BOOKING_URL}/bookings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || "Booking failed");
  }
  return res.json();
}

export async function confirmBooking(payload) {
  const res = await fetch(CONFIRM_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Confirmation failed");
  return res.json();
}
