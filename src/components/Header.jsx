import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
  return (
    <header className="header">
      <h1 className="logo">
        <Link to="/" className="logo-link">TerraQuest</Link>
      </h1>
      <nav>
        <ul className="nav-list">
          <li>
            <Link to="/" className="nav-link">Home</Link>
          </li>
          <li>
            <Link to="/about" className="nav-link">About</Link>
          </li>
          <li>
            <Link to="/leaderboard" className="nav-link">Leaderboard</Link>
          </li>
          <li>
            <Link to="/contact" className="nav-link">Contact</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
