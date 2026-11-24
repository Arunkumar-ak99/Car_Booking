import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Cars from "./pages/Cars";
import CarDetails from "./pages/CarDetails";
import Booking from "./pages/Booking";
import MyBookings from "./pages/MyBookings";
import { getCars } from "./api";

function App() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getCars()
      .then(setCars)
      .catch(() => setError("Unable to connect to the server. Start JSON Server and refresh."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="app">
      <Header />
      <main>
        {error && <div className="container"><p className="error-banner">{error}</p></div>}
        <Routes>
          <Route path="/" element={<Home cars={cars} loading={loading} />} />
          <Route path="/cars" element={<Cars cars={cars} loading={loading} />} />
          <Route path="/cars/:id" element={<CarDetails cars={cars} loading={loading} />} />
          <Route path="/booking/:id" element={<Booking cars={cars} />} />
          <Route path="/my-bookings" element={<MyBookings cars={cars} />} />
          <Route path="*" element={<div className="container empty-state"><h2>Page not found</h2></div>} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
