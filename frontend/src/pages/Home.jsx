import { Link } from "react-router-dom";

export default function Home() {
  return (
    <section className="hero">
      <p className="eyebrow">Campus events</p>
      <h1>Book tickets in minutes</h1>
      <p className="lede">
        Browse campus events and reserve seats through our microservice APIs.
      </p>
      <Link className="btn" to="/events">
        Browse events
      </Link>
    </section>
  );
}
