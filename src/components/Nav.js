import { Link } from 'react-router-dom';
function Nav(props) {
    return (
      <nav aria-label="navigation menu">
        <ul>
          <li><Link to="/" className="nav-item">Home</Link></li>
          <li><Link to="/about" className="nav-item">About</Link></li>
          <li><Link to="/menu" className="nav-item">Menu</Link></li>
          <li><Link to="/reservations" className="nav-item">Reservations</Link></li>
          <li><Link to="/order" className="nav-item">Order Online</Link></li>
          <li><Link to="/login" className="nav-item">Login</Link></li>
        </ul>
      </nav>
    )
  }
export default Nav;