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
        <div className="collapse navbar-collapse items-center bg-black lg:bg-transparent" id="navbarSupportedContent1">
          <ul className="navbar-nav flex flex-col pl-0 list-style-none mr-auto items-center">
            <li className="nav-item p-2">
              <a className="nav-link flex text-white hover:text-blue-600 p-5 w-full text-center duration-200" href="#">FILMS</a>
            </li>
            <li className="nav-item p-2">
              <a className="nav-link flex text-white hover:text-blue-600 p-5 w-full text-center duration-200" href="#">TICKETS</a>
            </li>
            <li className="nav-item p-2">
              <a className="nav-link flex text-white hover:text-blue-600 p-5 w-full text-center duration-200" href="#">TODAY</a>
            </li>
          </ul>
          <div className='flex items-center relative lg:hidden'>
            <a className="nav-link text-white hover:text-blue-600 p-5 w-full text-center duration-200" href="#">SIGN IN</a>
          </div>
        </div> 
        <div className='hidden items-center relative lg:flex'>
          <a className="nav-link text-white hover:text-blue-600 p-5 w-full text-center duration-200" href="#">SIGN IN</a>
        </div>
      </div>
    </nav>
  )
}
export default Navbar
