import { useMemo, useState } from "react";
import CarCard from "../components/CarCard";

function Cars({ cars, loading }) {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("All");
  const [sort, setSort] = useState("default");

  const filteredCars = useMemo(() => {
    let result = cars.filter(car =>
      `${car.name} ${car.brand}`.toLowerCase().includes(search.toLowerCase()) &&
      (type === "All" || car.type === type)
    );
    if (sort === "low") result = [...result].sort((a, b) => a.price - b.price);
    if (sort === "high") result = [...result].sort((a, b) => b.price - a.price);
    return result;
  }, [cars, search, type, sort]);

  return (
    <section className="container page-section">
      <div className="page-intro"><span className="eyebrow">THE DRIVEZY COLLECTION</span><h1>Explore our <em>cars.</em></h1><p>Find a ride that fits your plans and your budget.</p></div>
      <div className="filters">
        <div className="search-box"><span>⌕</span><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by car or brand..." /></div>
        <select value={type} onChange={e => setType(e.target.value)}><option>All</option><option>SUV</option><option>Hatchback</option><option>Sedan</option><option>MUV</option></select>
        <select value={sort} onChange={e => setSort(e.target.value)}><option value="default">Sort: Recommended</option><option value="low">Price: Low to high</option><option value="high">Price: High to low</option></select>
      </div>
      {loading ? <p className="muted">Loading cars...</p> : filteredCars.length ? <div className="car-grid">{filteredCars.map(car => <CarCard key={car.id} car={car} />)}</div> : <div className="empty-state"><h3>No cars found</h3><p>Try another search or category.</p></div>}
    </section>
  );
}
export default Cars;
