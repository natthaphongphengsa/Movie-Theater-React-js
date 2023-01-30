import React, {useEffect, useState} from 'react'
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Link,
} from "react-router-dom";
import axios from 'axios'
import { BiChevronRight } from 'react-icons/bi';

const Section = ({title, FetchURL}) => {
    const [movies, setMovies] = useState([]);
    useEffect(()=> {
        axios.get(FetchURL).then((response) => {
            setMovies(response.data.results)
        })
    },[FetchURL]);
    if(title == "TV"){
        return (
            <div className='p-10'>
                <h1 className='font-bold md:text-3xl flex'>{title} <BiChevronRight className='mt-1'/></h1>
                <div id={'slider'} className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-10 mt-3 flex-col">
                    {movies.map((item, id) => (
                        <div key={id} className='relative rounded-xl md:hover:scale-125 duration-200' id="movieRow">
                            <img className='w-full h-full rounded-xl' src={`https://image.tmdb.org/t/p/w500/${item?.poster_path}`} alt={`${item?.name}`}></img>
                            <Link to={`Film/${item?.id}`} className='absolute w-full h-full top-0 grid duration-200 cursor-pointer bg-black/70 rounded-xl opacity-0 hover:opacity-100'>
                                <p className='self-center text-center text-sm'>
                                    {item?.name}<br></br>
                                    Released: {item?.first_air_date}<br></br>
                                    IMDB: {item?.vote_average}<br></br>
                                </p>
                            </Link>
                        </div>                                        
                    ))}
                </div>
            </div>
        )
    }else{
        return (
            <div className='p-10'>
                <h1 className='font-bold md:text-3xl flex'>{title} <BiChevronRight className='mt-1'/></h1>
                <div id={'slider'} className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-10 mt-3 flex-col">
                    {movies.map((item, id) => (
                        <div key={id} className='relative rounded-xl md:hover:scale-125 duration-200' id="movieRow">
                            <img className='w-full h-full rounded-xl' src={`https://image.tmdb.org/t/p/w500/${item?.poster_path}`} alt={`${item?.title}`}></img>
                            <Link to={`Film/${item?.id}`} className='absolute w-full h-full top-0 grid duration-200 cursor-pointer bg-black/70 rounded-xl opacity-0 hover:opacity-100'>
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
        )
    }
    
}
export default Section