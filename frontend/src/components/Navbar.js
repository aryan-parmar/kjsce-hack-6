import React from 'react'
import { Link } from 'react-router-dom'
import "./style/navbar.css"

export default function Navbar() {
  return (
    <nav className="menu-container">
    {/* <!-- burger menu --> */}
    <input type="checkbox" aria-label="Toggle menu" />
    <span></span>
    <span></span>
    <span></span>

    {/* <!-- logo --> */}
    <Link to="#" className="menu-logo">
      <img
        src="/Logo.png"
        alt="LOgo" />
    </Link>

    {/* <!-- menu items --> */}
    <div className="menu">
      <ul>
        

        
      </ul>
      <ul>
        <li>
          <Link to="signup">
            Sign-up
          </Link>
        </li>
        <li>
          <Link to="login">
            Login
          </Link>
        </li>
      </ul>
    </div>
  </nav>
  )
}
