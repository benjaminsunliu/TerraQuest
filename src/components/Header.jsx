import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
  return (
    <header className="header">
      <h1 className="logo">
        <Link to="/" className="logo-link">
          <img src="/logo.png" alt="Terra Quest Logo" className="logo-image" />
          TerraQuest
        </Link>
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
            <Link to="/learning" className="nav-link">Learning</Link>
          </li>
          <li>
            <Link to="/community" className="nav-link">Community</Link>
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
