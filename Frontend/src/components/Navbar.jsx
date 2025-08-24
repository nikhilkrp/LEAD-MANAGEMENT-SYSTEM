import React from 'react'
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <nav className="navbar">
      <h1 className="logo">Lead Management</h1>
      <ul className="nav-links">
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/register">Register</Link></li>
        <li><Link to="/leads">Leads</Link></li>
      </ul>
    </nav>
    </div>
  )
}

export default Navbar
