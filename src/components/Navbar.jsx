import React, {useEffect, useRef, useState} from 'react'
import {requests, requestsVideo} from '../Data/Requests'
import axios from 'axios'
import {BrowserRouter as Router, Route, Routes, Link, useNavigate,} from "react-router-dom";
import 'tw-elements'
import { Spin as Hamburger } from 'hamburger-react'
import { BiSearchAlt2 } from 'react-icons/bi';

const Navbar = () => {
  const [isOpen, setOpen] = useState(false)
  const navRef = useRef();
  const [navBackground, setNavbar] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const showNavbar = () => {
    navRef.current.classList.toggle("showNav");    
    if(isOpen == true){
      setOpen(false);
    }
    else{
      setOpen(true);
    }
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

  function goToTop(){
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate({pathname: '/Movie-Theater-React-js/Search', search: `?query=${query}`,}, { replace: true });
    showNavbar();
    setOpen();
  };

  return (
    <>
      <nav className={`${navBackground ? 'bg-[#001426f2]':'bg-transparent'} w-full flex flex-wrap items-center justify-between py-3 navbar navbar-expand-lg navbar-light z-50 fixed top-0 px-6 duration-200`}>
        <div className="w-full flex flex-wrap items-center justify-between">
          <div className='flex'>
            <Link to="/Movie-Theater-React-js" className="text-xl pr-2 hover:text-blue-500 text-blue-600 font-bold cursor-pointer mr-4">24MOVIES</Link>
          </div>
          <button className='hamburger-menu w-full' type="button" onClick={showNavbar}>
            <Hamburger toggled={isOpen} toggle={setOpen} />
          </button>
          <div ref={navRef} className={`nav bg-black lg:bg-transparent text-xl overflow-y-auto`}>
            <div className='flex justify-end px-3'>
              <button className='hamburger-menu w-full' type="button" onClick={showNavbar}>
                  <Hamburger toggled={isOpen} toggle={setOpen} />
              </button>
            </div>
            <ul className="navbar-nav flex flex-col pl-0 list-style-none mr-auto items-center w-full h-full">
              <li className="nav-item w-fit text-center text-white p-2 px-6 duration-200 rounded-lg cursor-pointer">
                <div className='flex gap-2'>
                  <form onSubmit={handleSubmit}>
                    <input required={true} type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder='Search...' className="nav-link bg-transparent text-white border-b-2"/>
                  </form>
                </div>
              </li>
            </ul>          
          </div> 
        </div>
      </nav>
      <button data-aos="fade-left" data-aos-duration="1000" type="button" className={`${navBackground ? "inline-block": "hidden"} z-50 fixed p-3 bg-red-600 text-white leading-tight rounded-full shadow-md hover:bg-red-700 hover:shadow-lg active:bg-red-800 active:shadow-lg bottom-5 right-5`} onClick={goToTop}>
        <svg aria-hidden="true" focusable="false" data-prefix="fas" className="w-4 h-4" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M34.9 289.5l-22.2-22.2c-9.4-9.4-9.4-24.6 0-33.9L207 39c9.4-9.4 24.6-9.4 33.9 0l194.3 194.3c9.4 9.4 9.4 24.6 0 33.9L413 289.4c-9.5 9.5-25 9.3-34.3-.4L264 168.6V456c0 13.3-10.7 24-24 24h-32c-13.3 0-24-10.7-24-24V168.6L69.2 289.1c-9.3 9.8-24.8 10-34.3.4z"></path></svg>
      </button>
    </>
  )
}
export default Navbar
