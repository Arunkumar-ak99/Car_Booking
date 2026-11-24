import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cancelBooking, getBookings } from "../api";

function MyBookings({ cars }) {
  const location = useLocation();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState(location.state?.success || "");

  async function loadBookings() {
    try {
      const data = await getBookings();
      setBookings([...data].reverse());
    } catch {
      setError("Unable to load bookings. Make sure JSON Server is running.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    let active = true;

    getBookings()
      .then(data => {
        if (active) setBookings([...data].reverse());
      })
      .catch(() => {
        if (active) setError("Unable to load bookings. Make sure JSON Server is running.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => { active = false; };
  }, []);

  async function handleCancel(id) {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;
    try {
      await cancelBooking(id);
      setMessage("Booking cancelled.");
      loadBookings();
    } catch {
      setError("Could not cancel booking.");
    }
  }

  return (
    <section className="container page-section">
      <div className="page-intro"><span className="eyebrow">YOUR TRIPS</span><h1>My <em>bookings.</em></h1><p>All your car reservations in one place.</p></div>
      {message && <p className="success-banner">{message}</p>}
      {error && <p className="error-banner">{error}</p>}
      {loading ? <p className="muted">Loading bookings...</p> : bookings.length === 0 ? <div className="empty-state"><div className="empty-icon">⌁</div><h2>No bookings yet</h2><p>Your next journey is waiting for you.</p><Link to="/cars" className="primary-button">Explore cars →</Link></div> :
        <div className="booking-list">{bookings.map(booking => (
          <article className="booking-item" key={booking.id}>
            <img src={booking.carImage || (cars.find(car => car.id === booking.carId)?.image)} alt={booking.carName} />
            <div className="booking-item-main"><span className={`status ${booking.status === "Cancelled" ? "cancelled" : ""}`}>{booking.status}</span><h3>{booking.carName}</h3><p>{booking.pickupDate} <span>→</span> {booking.returnDate} · {booking.days} days</p><small>Booking #{booking.id}</small></div>
            <div className="booking-item-end"><strong>₹{Number(booking.totalAmount).toLocaleString("en-IN")}</strong>{booking.status !== "Cancelled" && <button className="cancel-button" onClick={() => handleCancel(booking.id)}>Cancel booking</button>}</div>
          </article>
        ))}</div>
      }
    </section>
  );
}
export default MyBookings;
