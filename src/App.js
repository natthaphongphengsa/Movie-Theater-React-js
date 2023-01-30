import React from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home'
import Film from './pages/Film'
import { Route, Routes } from 'react-router-dom';

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='Film/:id' element={<Film />}/>
      </Routes>
    </>
  );
}


