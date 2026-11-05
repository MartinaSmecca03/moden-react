import { Link } from "react-router-dom";
import logo from "../assets/moden-logo.jpg";

function Header() {
  return (
    <header className="site-header">
      <Link to="/" className="logo">
        <img src={logo} alt="MODEN logo" className="logo-image" />
      </Link>

      <nav>
        <Link to="/">Home</Link>
        <Link to="/catalogo">Catalogo</Link>
        <Link to="/preferiti">Preferiti</Link>
        <Link to="/carrello">Carrello</Link>
        <Link to="/account">Account</Link>
      </nav>
    </header>
  );
}

export default Header;

