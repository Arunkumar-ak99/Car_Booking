import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { createBooking, getBookings } from "../api";

function Booking({ cars }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const car = cars.find(item => String(item.id) === id);
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const today = new Date().toISOString().split("T")[0];

  const start = pickupDate ? new Date(`${pickupDate}T00:00:00`) : null;
  const end = returnDate ? new Date(`${returnDate}T00:00:00`) : null;
  const days = start && end && end > start ? Math.ceil((end - start) / 86400000) : 0;
  const total = car ? days * Number(car.price) : 0;

  function handlePickupDateChange(value) {
    setPickupDate(value);
    if (returnDate && value && returnDate <= value) setReturnDate("");
  }

  if (!car) return <div className="container empty-state"><h2>Car not found</h2><Link to="/cars">Back to cars</Link></div>;

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (!customerName.trim() || !phone.trim() || !pickupDate || !returnDate) {
      setError("Please complete all fields.");
      return;
    }
    if (!/^[0-9]{10}$/.test(phone)) {
      setError("Enter a valid 10-digit mobile number.");
      return;
    }
    if (days < 1) {
      setError("Return date must be after pickup date.");
      return;
    }

    setSaving(true);
    try {
      const existing = await getBookings();
      const conflict = existing.some(booking =>
        String(booking.carId) === String(car.id) &&
        booking.status !== "Cancelled" &&
        pickupDate < booking.returnDate &&
        returnDate > booking.pickupDate
      );
      if (conflict) {
        setError("This car is already booked for some of these dates. Please choose different dates.");
        setSaving(false);
        return;
      }

      await createBooking({
        carId: car.id,
        carName: car.name,
        carImage: car.image,
        customerName: customerName.trim(),
        phone,
        pickupDate,
        returnDate,
        days,
        pricePerDay: Number(car.price),
        totalAmount: total,
        status: "Confirmed",
        createdAt: new Date().toISOString()
      });
      navigate("/my-bookings", { state: { success: "Your car has been booked successfully." } });
    } catch {
      setError("Could not save booking. Make sure JSON Server is running.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="container page-section">
      <Link to={`/cars/${car.id}`} className="back-link">← Back to car details</Link>
      <div className="booking-layout">
        <div className="booking-form-card">
          <span className="eyebrow">RESERVE YOUR RIDE</span><h1>Book your <em>car.</em></h1><p className="muted">Enter your details and choose your rental dates.</p>
          <form onSubmit={handleSubmit} className="booking-form">
            <label>Full name<input value={customerName} onChange={e => setCustomerName(e.target.value)} placeholder="Enter your full name" /></label>
            <label>Mobile number<input value={phone} onChange={e => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))} placeholder="10-digit mobile number" inputMode="numeric" /></label>
            <div className="date-fields">
              <label>Pickup date<input type="date" min={today} value={pickupDate} onChange={e => handlePickupDateChange(e.target.value)} /></label>
              <label>Return date<input type="date" min={pickupDate || today} value={returnDate} onChange={e => setReturnDate(e.target.value)} /></label>
            </div>
            {error && <p className="form-error">{error}</p>}
            <button className="primary-button full-button" disabled={saving}>{saving ? "Confirming..." : "Confirm booking →"}</button>
          </form>
        </div>
        <aside className="booking-summary">
          <img src={car.image} alt={car.name} />
          <div className="summary-content"><span className="eyebrow">YOUR SELECTED CAR</span><h3>{car.name}</h3><p className="muted">{car.type} · {car.transmission} · {car.seats} seats</p><div className="summary-line"><span>Price per day</span><strong>₹{Number(car.price).toLocaleString("en-IN")}</strong></div><div className="summary-line"><span>Rental days</span><strong>{days || "—"}</strong></div><div className="summary-total"><span>Total amount</span><strong>₹{total.toLocaleString("en-IN")}</strong></div><small className="muted">Total is calculated from pickup and return dates. One day is charged per 24-hour calendar day.</small></div>
        </aside>
      </div>
    </section>
  );
}
export default Booking;
