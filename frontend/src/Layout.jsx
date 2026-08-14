import { NavLink, Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="app">
      <header className="top">
        <NavLink to="/" className="brand">
          CampusTix
        </NavLink>
        <nav>
          <NavLink to="/" end>
            Home
          </NavLink>
          <NavLink to="/events">Events</NavLink>
          <NavLink to="/my-bookings">My Bookings</NavLink>
        </nav>
      </header>
      <main className="main">
        <Outlet />
      </main>
      <footer className="foot">CampusTix — Cloud IT final project</footer>
    </div>
  );
}
