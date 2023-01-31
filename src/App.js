import React from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home'
import Film from './pages/Film'
import Films from './pages/Movies'
import Tv from './pages/Tv'
import { Route, Routes } from 'react-router-dom';

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='Film/:id' element={<Film />}/>
        <Route path='Movies' element={<Films />}/>
        <Route path='Tv' element={<Tv />}/>
      </Routes>
    </>
  );
}


