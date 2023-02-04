import React, {useEffect, useState} from 'react'
import {BrowserRouter as Router, Route, Routes, Link} from "react-router-dom";
import axios from 'axios'
import { BiChevronRight } from 'react-icons/bi';
import * as SVGLoaders from 'svg-loaders-react';

const Section = ({title, FetchURL}) => {
    const [movies, setMovie] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(()=> {
        const fetData = async () => {
            const newUrl = `${FetchURL}${Math.floor(Math.random() * 15)}`;
            await axios.get(newUrl).then((response) => {
                setMovie(response.data.results);
            })
        }
        fetData();
        setLoading(false);
    },[]);

    if(isLoading == true){
        return (
            <div className='w-full h-full p-52 relative bg-transparent z-50 flex'>
                <h1 className='left-[50%] top-[70%] absolute translate-x-[-50%]'>Loading....</h1>
                <SVGLoaders.Puff stroke="#ffffff" width="140" height="140" className="left-[50%] top-[50%] absolute translate-x-[-50%] translate-y-[-50%]"/>
            </div>)
    }else{
        if(title === "Tv"){
            return (
                <div className='lg:p-10 p-2'>
                    <Link to={`/Movie-Theater-React-js/Films/${title}`} className='font-bold text-3xl md:text-3xl flex link-light w-fit hover:link-primary duration-200' data-aos="fade-up" data-aos-duration="1000">{title}<BiChevronRight className='mt-1'/></Link>
                    <div id={'slider'} className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2 lg:gap-8 md:gap-6 mt-5 flex-col" data-aos="fade-up" data-aos-duration="2000">
                        {movies.map((item, id) => (
                            <div key={id} className='relative rounded-xl lg:hover:scale-110 duration-200' id="movieRow" >
                                <img className='w-full h-full rounded-xl' src={`https://image.tmdb.org/t/p/w500/${item?.poster_path}`} alt={`${item?.name}`}></img>
                                <Link to={`Film/${item?.id}`} id={item?.id}  className='absolute w-full h-full top-0 grid duration-200 cursor-pointer bg-black/70 rounded-xl opacity-0 lg:hover:opacity-100'>
                                    <p className='self-center text-center text-sm'>
                                        {item.name}<br></br>
                                        Released: {item.first_air_date}<br></br>
                                        IMDB: {item.vote_average}<br></br>
                                    </p>
                                </Link>
                            </div>                                     
                        ))}
                    </div>
                </div>
            );
        }else{
            return (
                <div className='lg:p-10 p-2'>
                    <Link to={`/Movie-Theater-React-js/Films/${title}`} className='font-bold text-3xl md:text-3xl flex link-light w-fit hover:link-primary duration-200' data-aos="fade-up" data-aos-duration="1000">{title}<BiChevronRight className='mt-1'/></Link>
                    <div id={'slider'} className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2 lg:gap-8 md:gap-6 mt-5 flex-col" data-aos="fade-up" data-aos-duration="1000">
                        {movies.map((item, id) => (
                            <div key={id} className='relative rounded-xl lg:hover:scale-110 duration-200' id="movieRow">
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
            );
        };
    }
    
}
export default Section