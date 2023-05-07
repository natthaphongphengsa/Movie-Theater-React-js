import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home'
import Film from './pages/Film'
import Films from './pages/Films'
import Search from './pages/Search';

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/Movie-Theater-React-js' element={<Home />}/>
        <Route path='/Movie-Theater-React-js/Film/:movie_id' element={<Film />}/>
        <Route path='/Movie-Theater-React-js/Films/:trend' element={<Films />}/>
        <Route path='/Movie-Theater-React-js/Films/:trend/:movie_id' element={<Films />}/>
        <Route path='/Movie-Theater-React-js/Films/:trend/:movie_id/:movie_id' element={<Film />}/>
        <Route path='/Movie-Theater-React-js/Search/' element={<Search />}/>
        <Route path='/Movie-Theater-React-js/Search/Film/:movie_id' element={<Film />}/>
      </Routes>
    </>
  );
}


