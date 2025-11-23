import React from 'react';
import './NavBar.css'
import logo from "../assets/logo.png"
import { Link } from 'react-router-dom';



function NavBar() {
  function showSidebar() {
  const sidebar =document.querySelector('.sidebar')
  sidebar.style.display= 'flex'};

  function hideSidebar() {
  const sidebar =document.querySelector('.sidebar')
  sidebar.style.display= 'none'};


  return (
    <div >
        <nav  className='navbar'>
            <img src={logo} className='logo' />
             <ul className='sidebar'>
                 <button onClick={hideSidebar} className='search-btn'>close</button>
            <li ><Link to="/">Home</Link></li>
            <li ><Link to="/categories">Categories</Link></li>
            <li ><Link to="/contact">Contact us</Link></li>
            <li ><Link to="/about">About us</Link></li>
               
                
            </ul>

          <ul className="navb">
            <li className="hidenavbar"><Link to="/">Home</Link></li>
            <li className="hidenavbar"><Link to="/categories">Categories</Link></li>
            <li className="hidenavbar"><Link to="/contact">Contact us</Link></li>
            <li className="hidenavbar"><Link to="/about">About us</Link></li>
            <button onClick={showSidebar} className="menu" >Menu</button>
           </ul>
        </nav>
      
    </div>
  )
}

export default NavBar
