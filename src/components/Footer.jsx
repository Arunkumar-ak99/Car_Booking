import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div><Link to="/" className="brand footer-brand"><span className="brand-mark">D</span> drivezy<span className="brand-dot">.</span></Link><p>Make every journey yours.</p></div>
        <p>© {new Date().getFullYear()} Drivezy. React learning project.</p>
      </div>
    </footer>
  );
}

export default Footer;
