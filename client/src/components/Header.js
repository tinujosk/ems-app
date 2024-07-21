import React from 'react';
import { NavLink } from 'react-router-dom';
import '../App.css';

function Header() {
  return (
    <div className='appHeader'>
      <nav>
        <NavLink to='/'>Home</NavLink>
      </nav>
      <h1 className='appTitle'>Employee Management System</h1>
    </div>
  );
}

export default Header;
