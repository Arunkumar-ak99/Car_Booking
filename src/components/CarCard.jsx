import { Link } from "react-router-dom";

function CarCard({ car }) {
  return (
    <article className="car-card">
      <Link to={`/cars/${car.id}`} className="car-image-wrap">
        <img src={car.image} alt={car.name} className="car-image" />
        <span className="car-type">{car.type}</span>
      </Link>
      <div className="car-card-content">
        <div className="car-title-row"><h3>{car.name}</h3><span className="car-rating">★ 4.8</span></div>
        <div className="car-meta">
          <span>♙ {car.seats} Seats</span><span>⚙ {car.transmission}</span><span>⛽ {car.fuel}</span>
        </div>
        <div className="car-card-bottom">
          <p><strong>₹{Number(car.price).toLocaleString("en-IN")}</strong><span> / day</span></p>
          <Link to={`/cars/${car.id}`} className="small-button">View car</Link>
        </div>
      </div>
    </article>
  );
}

export default CarCard;
