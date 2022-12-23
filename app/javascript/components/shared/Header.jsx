import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => (
  <nav className="navbar navbar-expand-lg navbar-light ">
    <Link className='navbar-brand goog' to='/'>O-Sale</Link>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>

    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ms-auto">
        <li className="nav-item">
          <Link className='nav-link' to='/'>Home</Link>
        </li>
        <li className="nav-item">
          <Link className='nav-link' to='/'>Sign In</Link>
        </li>
        <li className="nav-item">
          <Link className='nav-link' to='/'>Sign Up</Link>
        </li>
      </ul>
    </div>
  </nav>
)

export default Header
