import { NavLink } from "@remix-run/react";
import { useLoaderData } from "@remix-run/react";
import { useState } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';
import { FiMenu } from 'react-icons/fi'; 

export default function Nav() {
  const user = useLoaderData();
  const [darkMode, setDarkMode] = useState(false);
  const [navOpen, setNavOpen] = useState(false); 

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.setAttribute('data-theme', darkMode ? 'light' : 'dark');
  };

  const toggleNav = () => {
    setNavOpen(!navOpen); 
  };

  return (
    <nav>
      <NavLink className="logo" to="/events">CK-EVENT</NavLink>
      <FiMenu className="burger" onClick={toggleNav} /> {/* Burger menu icon */}
      <div className={`nav-links ${navOpen ? 'open' : ''}`} id="navLinks"> {/* Add 'open' class when navOpen is true */}
        <NavLink to="/events">Events</NavLink>
        {!user.isAuthenticated && <NavLink to="/signin">Sign in</NavLink>}
        {user.isAuthenticated && (
        <>
          <NavLink to="/add-event">Add event</NavLink>
          <NavLink to="/profile">Profile</NavLink>
        </>
        )}
        <div 
          className="toggle-button" 
          onClick={toggleDarkMode} 
          onKeyDown={(e) => e.key === 'Enter' && toggleDarkMode()} 
          role="button" 
          tabIndex={0}
        >
          {darkMode ? <FaSun /> : <FaMoon />}
        </div>
      </div>
    </nav>
  );
}