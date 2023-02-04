import axios from "axios";
import { useEffect, useState } from "react";
import {BrowserRouter as Router, Route, Routes, Link, useParams} from "react-router-dom";
import { requestFilms, requests } from '../Data/Requests';
import ReactPaginate from 'react-paginate';
import * as SVGLoaders from 'svg-loaders-react';

const FilmList = () => {
  const {trend} = useParams();
  const [movies, setMovies] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setCurrenPage] = useState(1);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetchData(trend, currentPage);
  },[])

  const handlePageClick = (event) => {
    fetchData(trend, event.selected+1);  
  };
  const fetchData = async (trend, currentPage) => {
    const newletter = trend.toLowerCase().replace(" ", "_");
    console.log(newletter);
    if(newletter == "tv"){
      await axios.get(requestFilms(true, newletter, currentPage))
      .then((response) => {        
        setMovies(response.data.results);
        setPageCount(response.data.total_pages);
        setCurrenPage(response.data.page);            
      });
    }
    else if(newletter == "now_playing"){
      const newUrl = `${requests.requestNowPlaying}${currentPage}`;
      await axios.get(newUrl)
      .then((response) => {        
        setMovies(response.data.results);
        setPageCount(response.data.total_pages);
        setCurrenPage(response.data.page);            
      });
    }
    else{
      await axios.get(requestFilms(false, newletter, currentPage))
      .then((response) => {        
        setMovies(response.data.results);
        setPageCount(response.data.total_pages);
        setCurrenPage(response.data.page);            
      });
    }
    setLoading(false);
  }

  if(isLoading == true){
    return (
      <div className='w-full h-full p-52 fixed bg-[#001d66] z-50 flex'>
      <h1 className='left-[50%] top-[70%] relative translate-x-[-50%]'>Loading....</h1>
      <SVGLoaders.Puff stroke="#ffffff" width="140" height="140" className="left-[50%] top-[50%] fixed translate-x-[-50%] translate-y-[-50%]"/>
       </div>
      )
  }else{
    return (
      <>
        <div className='pt-36 sm:px-0 container mx-auto lg:px-10'>
          <h1 className='text-3xl px-4 text-center'>{trend}</h1>
          <div className='lg:p-10 p-2'>               
                  <div id={'slider'} className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2 lg:gap-8 md:gap-6 mt-5 flex-col">
                      {movies?.map((item, id) => (
                          <div key={id} className='relative rounded-xl lg:hover:scale-110 duration-200' id="movieRow" data-aos="fade" data-aos-duration="2000">
                              <img className='w-full h-full rounded-xl' src={`https://image.tmdb.org/t/p/w500/${item?.poster_path}`} alt={`${item?.title}`}></img>
                              <Link to={`${item?.id}`} id={item?.id} className='absolute w-full h-full top-0 grid duration-200 cursor-pointer bg-black/70 rounded-xl opacity-0 lg:hover:opacity-100'>
                                  <p className='self-center text-center text-sm'>
                                      {item?.title}<br></br>
                                      Released: {item?.release_date}<br></br>
                                      IMDB: {item?.vote_average}<br></br>
                                  </p>
                              </Link>
                          </div>                                        
                      ))}
                  </div>
              </div>
        </div>
        <div className="flex justify-center lg:mt-12 lg:mb-20 mt-12 mb-20">
          <ReactPaginate
            breakLabel="..."
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageCount={pageCount}
            previousLabel="< previous"
            renderOnZeroPageCount={null}
            containerClassName="flex lg:gap-6 sm:gap-2 md:gap:4 gap-2 flex-row"
            pageLinkClassName="lg:px-4 lg:p-2 sm:px-1 p-1 rounded-full duration-200 hover:bg-blue-600"
            previousLinkClassName="bg-blue-600 lg:px-4 lg:p-2 p-1 rounded-full duration-200 hover:bg-blue-400"
            nextLinkClassName="bg-blue-600 lg:px-7 lg:p-2 p-1 rounded-full duration-200 hover:bg-blue-400"
            activeLinkClassName="bg-blue-600 lg:p-4 lg:px-5 rounded-full duration-200 hover:bg-blue-400"
          />
        </div>
      </>
    )
  } 
}
export default FilmList
