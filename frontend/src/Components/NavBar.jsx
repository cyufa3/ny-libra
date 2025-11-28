import React, { useEffect, useRef, useState } from 'react';
import './NavBar.css';
import logo from "../assets/logo.png";
import { Link } from 'react-router-dom';

function NavBar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);

  const showSidebar = () => setSidebarOpen(true);
  const hideSidebar = () => setSidebarOpen(false);

  // Close sidebar when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        sidebarOpen
      ) {
        hideSidebar();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sidebarOpen]);

  return (
    <div>
      <nav className="navbar">
        <img src={logo} className="logo" alt="logo" />

        {/* SIDEBAR */}
        <ul
          className="sidebar"
          ref={sidebarRef}
          style={{ display: sidebarOpen ? "flex" : "none" }}
        >
          <button onClick={hideSidebar} className="search-btn">close</button>

          <li onClick={hideSidebar}><Link to="/">Home</Link></li>
          <li onClick={hideSidebar}><Link to="/categories">Categories</Link></li>
          <li onClick={hideSidebar}><Link to="/contact">Contact us</Link></li>
          <li onClick={hideSidebar}><Link to="/about">About us</Link></li>
        </ul>

        {/* TOP NAV */}
        <ul className="navb">
          <li className="hidenavbar"><Link to="/">Home</Link></li>
          <li className="hidenavbar"><Link to="/categories">Categories</Link></li>
          <li className="hidenavbar"><Link to="/contact">Contact us</Link></li>
          <li className="hidenavbar"><Link to="/about">About us</Link></li>

          <button onClick={showSidebar} className="menu">Menu</button>
        </ul>
      </nav>
    </div>
  );
}

export default NavBar;
