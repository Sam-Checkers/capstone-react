import React, { useContext } from 'react';
import { UserAuthContext } from './UserAuthContext';
import './NavBar.css'

function NavBar() {
  const { isAuthenticated, logout } = useContext(UserAuthContext);

  const handleLogout = () => {
    logout();
  };

  return (
    <nav>
      <ul>
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/schedule">Schedule</a>
        </li>
        {!isAuthenticated && (
          <li>
            <a href="/register">Register</a>
          </li>
        )}
        {!isAuthenticated && (
          <li>
            <a href="/login">Login</a>
          </li>
        )}
        {isAuthenticated && (
          <li>
            <a href="/logout" onClick={handleLogout}>Logout</a>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default NavBar;