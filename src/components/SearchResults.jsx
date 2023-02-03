import axios from "axios";
import { useEffect, useState } from "react";
import {BrowserRouter as Router, Route, Routes, Link, useParams} from "react-router-dom";
import { requestSearchMovie } from "../Data/Requests";
import { BiChevronRight } from 'react-icons/bi';
import ReactPaginate from 'react-paginate';

const SearchResults = () => {
  const {query} = useParams();
  const [movies, setMovies] = useState([]);

  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setCurrenPage] = useState(1);

 useEffect(() => {   
    FetchResults(query,currentPage);
  },[])

  const handlePageClick = (event) => {
    FetchResults(query, event.selected+1)
  };

  function FetchResults(query, currentPage){    
    fetch(requestSearchMovie(query, currentPage))
    .then((response) => response.json())
    .then((data) => {        
      setMovies(data.results);
      setPageCount(data.total_pages);
      setCurrenPage(data.page);              
    });

  }

  return (
    <>
      <div className='pt-36 sm:px-0 container mx-auto lg:px-10'>
        <h1 className='text-3xl px-4'>Results: {query}</h1>
        <div className='lg:p-10 p-2'>               
                <div id={'slider'} className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2 lg:gap-8 md:gap-6 mt-5 flex-col">
                    {movies?.map((item, id) => (
                        <div key={id} className='relative rounded-xl lg:hover:scale-110 duration-200' id="movieRow" data-aos="fade" data-aos-duration="2000">
                            <img className='w-full h-full rounded-xl' src={`https://image.tmdb.org/t/p/w500/${item?.poster_path}`} alt={`${item?.title}`}></img>
                            <Link to={`Film/${item?.id}`} id={item?.id} className='absolute w-full h-full top-0 grid duration-200 cursor-pointer bg-black/70 rounded-xl opacity-0 lg:hover:opacity-100'>
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

export default SearchResults