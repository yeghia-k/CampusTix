const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 4001;

// Cloud image host: Netlify static files at /images
// Override with IMAGE_BASE_URL if the Netlify URL changes.
const IMAGE_BASE = (
  process.env.IMAGE_BASE_URL || "https://campustix-app.netlify.app/images"
).replace(/\/$/, "");

function imageUrl(file) {
  return `${IMAGE_BASE}/${file}`;
}

const events = [
  {
    id: "1",
    title: "Freshers Welcome Night",
    date: "2026-09-12",
    venue: "Main Hall",
    price: 8,
    description: "Meet classmates, live DJ, and campus clubs fair.",
    imageUrl: imageUrl("freshers.jpg"),
  },
  {
    id: "2",
    title: "Tech Talk: Cloud Microservices",
    date: "2026-09-20",
    venue: "Lab 3",
    price: 5,
    description: "Short talks on Docker, APIs, and cloud deploy.",
    imageUrl: imageUrl("techtalk.jpg"),
  },
  {
    id: "3",
    title: "Campus Football Final",
    date: "2026-09-28",
    venue: "Sports Field",
    price: 6,
    description: "Cheer on the college team in the season final.",
    imageUrl: imageUrl("football.jpg"),
  },
  {
    id: "4",
    title: "Open Mic & Coffee",
    date: "2026-10-03",
    venue: "Student Cafe",
    price: 4,
    description: "Poetry, music, and free coffee for ticket holders.",
    imageUrl: imageUrl("openmic.jpg"),
  },
];

app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ ok: true, service: "catalog-api" });
});

app.get("/events", (_req, res) => {
  res.json(events);
});

app.get("/events/:id", (req, res) => {
  const event = events.find((e) => e.id === req.params.id);
  if (!event) {
    return res.status(404).json({ error: "Event not found" });
  }
  res.json(event);
});

app.listen(PORT, () => {
  console.log(`catalog-api listening on ${PORT}`);
  console.log(`IMAGE_BASE_URL=${IMAGE_BASE}`);
});
