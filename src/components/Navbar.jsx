import React, {useEffect, useRef, useState} from 'react'
import {requests, requestsVideo} from '../Requests'
import axios from 'axios'
import {BrowserRouter as Router, Route, Routes, Link,} from "react-router-dom";
import 'tw-elements'
import { Spin as Hamburger } from 'hamburger-react'

const Navbar = () => {
  const [isOpen, setOpen] = useState(false)
  const navRef = useRef();
  const [navBackground, setNavbar] = useState(false);

  const showNavbar = () => {
    navRef.current.classList.toggle("showNav");    
  }
  const changeBackgroundColor = () => {
    if(window.scrollY >= 80){
      setNavbar(true);
    }
    else{
      setNavbar(false);
    }
  }
  window.addEventListener("scroll", changeBackgroundColor);

  return (
    <nav className={`${navBackground ? 'bg-[#001426f2]':'bg-transparent'} w-full flex flex-wrap items-center justify-between py-3 navbar navbar-expand-lg navbar-light z-50 fixed top-0 duration-200`}>
      <div className="w-full flex flex-wrap items-center justify-between px-6">
        <Link to="/" className="text-xl pr-2 hover:text-blue-500 text-blue-600 font-bold cursor-pointer">24MOVIES</Link>
        <button className='hamburger-menu' type="button" onClick={showNavbar}>
          <Hamburger toggled={isOpen} toggle={setOpen} />
        </button>
        <div ref={navRef} className="nav items-center bg-black lg:bg-transparent text-xl">
          <ul className="navbar-nav flex flex-col pl-0 list-style-none mr-auto items-center w-full h-full justify-center">
            <li className="nav-item w-fit text-center text-white hover:bg-white hover:text-blue-600 p-2 px-6 duration-200 rounded-lg cursor-pointer">
              <Link to="/Movies" className="nav-link">MOVIES</Link>
            </li>
            <li className="nav-item w-fit text-center text-white hover:bg-white hover:text-blue-600 p-2 px-6 duration-200 rounded-lg cursor-pointer">
              <Link to="/TV" className="nav-link">TV</Link>
            </li>
            <li className="nav-item w-fit text-center text-white hover:bg-white hover:text-blue-600 p-2 px-6 duration-200 rounded-lg cursor-pointer">
              <a className="nav-link" href="#">TICKETS</a>
            </li>
            <li className="lg:hidden nav-item w-fit text-center text-white hover:bg-white hover:text-blue-600 p-2 px-6 duration-200 rounded-lg cursor-pointer">
              <a className="nav-link" href="#">SIGN IN</a>
            </li>
          </ul>
        </div> 
        <div className='hidden lg:flex text-xl text-center'>
          <a className="nav-link text-white hover:bg-white hover:text-blue-600 p-2 px-6 w-full duration-200 rounded-lg" href="#">SIGN IN</a>
        </div>
      </div>
    </nav>
  )
}
export default Navbar
