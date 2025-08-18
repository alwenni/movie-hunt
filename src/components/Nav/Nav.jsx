// components/Nav/Nav.jsx
import { Link } from "react-router-dom";
import "./Nav.css";
export default function Nav(){
  return (
    <footer>
    <nav className="nav" id="navii">
      <Link to="/"><div>Home</div></Link>
      <Link to="/about"><div>About</div></Link>
      <Link to="/watchList"><div>Watchlist</div></Link>
    </nav>
    </footer>
  );
}