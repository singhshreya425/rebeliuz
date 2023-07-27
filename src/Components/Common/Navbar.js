import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link className="nav-link" to="/">Home</Link>
      <Link className="nav-link" to="/user-data">User Data</Link>
      <Link className="nav-link" to="/form">Use Form</Link>
    </nav>
  );
}

export default Navbar;