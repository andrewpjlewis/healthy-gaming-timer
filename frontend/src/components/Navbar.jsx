import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Navbar.css';

export default function Navbar() {
  const { loggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login'); // redirect after logout
  };

  return (
    <div className="sidebar">
      <h2 className="logo">🎮 Healthy Timer</h2>
      <nav className="nav-links">
        <NavLink to="/dashboard">Dashboard</NavLink>
        <NavLink to="/goals">Goals</NavLink>
        <NavLink to="/session">Session</NavLink>
        <NavLink to="/reminders">Reminders</NavLink>

        {!loggedIn ? (
          <>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/register">Register</NavLink>
          </>
        ) : (
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        )}
      </nav>
    </div>
  );
}
