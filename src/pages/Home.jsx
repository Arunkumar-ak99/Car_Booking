import { Link } from "react-router-dom";
import CarCard from "../components/CarCard";

function Home({ cars, loading }) {
  const featured = cars.slice(0, 3);
  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="eyebrow"><span className="eyebrow-line"></span> YOUR JOURNEY, YOUR RULES</span>
            <h1>Find the right car.<br /><em>Enjoy the ride.</em></h1>
            <p>Choose your ride, pick your dates and get ready to explore. A simple way to book a car for your next journey.</p>
            <div className="hero-actions"><Link to="/cars" className="primary-button">Explore cars <span>→</span></Link><span className="trust-note">Simple booking · Clear daily prices</span></div>
            <div className="hero-stats"><div><strong>06+</strong><span>Cars to explore</span></div><div><strong>24/7</strong><span>Online booking</span></div><div><strong>Easy</strong><span>Booking process</span></div></div>
          </div>
          <div className="hero-visual">
            <div className="hero-image"></div>
            <div className="floating-card"><span className="floating-icon">✦</span><div><strong>Find your freedom</strong><small>Your next trip starts here</small></div></div>
            <span className="hero-side-label">DRIVE YOUR WAY — 01</span>
          </div>
        </div>
      </section>
      <section className="section container">
        <div className="section-heading"><div><span className="eyebrow">HANDPICKED FOR YOU</span><h2>Popular <em>rides</em></h2><p>Comfortable rides for every kind of plan.</p></div><Link to="/cars" className="text-link">View all cars ↗</Link></div>
        {loading ? <p className="muted">Loading cars...</p> : <div className="car-grid">{featured.map(car => <CarCard key={car.id} car={car} />)}</div>}
      </section>
      <section className="how-section"><div className="container"><div className="section-heading light-heading"><div><span className="eyebrow">THREE SIMPLE STEPS</span><h2>Ready, set, <em>go.</em></h2></div></div><div className="steps-grid"><div className="step"><span>01</span><h3>Choose your car</h3><p>Explore our cars and pick the one that suits your journey.</p></div><div className="step"><span>02</span><h3>Select your dates</h3><p>Choose pickup and return dates. Your rental total is calculated automatically.</p></div><div className="step"><span>03</span><h3>Confirm booking</h3><p>Review your details and confirm. Your booking appears in My Bookings.</p></div></div></div></section>
    </>
  );
}
export default Home;
