import React, {useEffect, useState} from 'react'
import {requests, requestsVideo} from '../Requests'
import axios from 'axios'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
} from "react-router-dom";
import 'tw-elements'

const Navbar = () => {
  return (
    <nav className="w-full flex flex-wrap items-center justify-between py-3 navbar navbar-expand-lg navbar-light bg-transparent z-50 absolute top-0 bg-black lg:bg-transparent">
      <div className="w-full flex flex-wrap items-center justify-between px-6">
        <Link to="/" className="text-xl pr-2 hover:text-blue-500 text-blue-600 font-bold cursor-pointer">24MOVIES</Link>
        <button
          className="navbar-toggler text-gray-200 border-0 hover:shadow-none hover:no-underline py-2 px-2.5 bg-transparent focus:outline-none focus:ring-0 focus:shadow-none focus:no-underline"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent1"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="bars"
            className="w-6"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
          >
            <path
              fill="currentColor"
              d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"
            ></path>
          </svg>
        </button>
        <div className="collapse navbar-collapse items-center bg-black lg:bg-transparent text-xl" id="navbarSupportedContent1">
          <ul className="navbar-nav flex flex-col pl-0 list-style-none mr-auto items-center md:gap-6 w-full">
            <li className="nav-item w-full text-center text-white hover:bg-white hover:text-blue-600 p-2 px-6 duration-200 rounded-lg cursor-pointer">
              <a className="nav-link" href="#">FILMS</a>
            </li>
            <li className="nav-item w-full text-center text-white hover:bg-white hover:text-blue-600 p-2 px-6 duration-200 rounded-lg cursor-pointer">
              <a className="nav-link" href="#">TICKETS</a>
            </li>
            <li className="nav-item w-full text-center text-white hover:bg-white hover:text-blue-600 p-2 px-6 duration-200 rounded-lg cursor-pointer">
              <a className="nav-link" href="#">TODAY</a>
            </li>
            <li className="lg:hidden nav-item w-full text-center text-white hover:bg-white hover:text-blue-600 p-2 px-6 duration-200 rounded-lg cursor-pointer">
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
