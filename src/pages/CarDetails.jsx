import { Link, useParams } from "react-router-dom";

function CarDetails({ cars, loading }) {
  const { id } = useParams();
  const car = cars.find(item => String(item.id) === id);

  if (loading) return <div className="container page-section">Loading car details...</div>;
  if (!car) return <div className="container empty-state"><h2>Car not found</h2><Link to="/cars" className="text-link">Back to cars</Link></div>;

  return (
    <section className="container page-section">
      <Link to="/cars" className="back-link">← Back to cars</Link>
      <div className="details-grid">
        <div className="details-image"><img src={car.image} alt={car.name} /></div>
        <div className="details-info">
          <span className="eyebrow">{car.brand} · {car.type}</span><h1>{car.name}</h1><p className="details-description">{car.description}</p>
          <div className="spec-grid"><div><small>SEATS</small><strong>{car.seats} people</strong></div><div><small>TRANSMISSION</small><strong>{car.transmission}</strong></div><div><small>FUEL</small><strong>{car.fuel}</strong></div><div><small>BODY TYPE</small><strong>{car.type}</strong></div></div>
          <div className="details-book-row"><p><strong>₹{Number(car.price).toLocaleString("en-IN")}</strong><span> / day</span></p><Link to={`/booking/${car.id}`} className="primary-button">Book this car →</Link></div>
        </div>
      </div>
    </section>
  );
}
export default CarDetails;
