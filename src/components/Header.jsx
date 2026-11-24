import { NavLink, Link } from "react-router-dom";

function Header() {
  return (
    <header className="site-header">
      <div className="container nav-wrap">
        <Link to="/" className="brand"><span className="brand-mark">D</span> drivezy<span className="brand-dot">.</span></Link>
        <nav className="main-nav">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/cars">Explore Cars</NavLink>
          <NavLink to="/my-bookings">My Bookings</NavLink>
        </nav>
        <Link to="/cars" className="header-cta">Book a car <span>↗</span></Link>
      </div>
    </header>
  );
}

export default Header;
