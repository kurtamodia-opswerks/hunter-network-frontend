import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">
      <h1 className="logo">Hunter Network</h1>
      <ul className="nav-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/hunters">Hunters</Link>
        </li>
        <li>
          <Link to="/guilds">Guilds</Link>
        </li>
        <li>
          <Link to="/dungeons">Dungeons</Link>
        </li>
      </ul>
    </nav>
  );
}
