import React, {useEffect, useState} from 'react'
import {BrowserRouter as Router, Route, Routes, Link} from "react-router-dom";
import axios from 'axios'
import { BiChevronRight } from 'react-icons/bi';
import * as SVGLoaders from 'svg-loaders-react';
import { AiFillStar, AiOutlineHeart, AiOutlineStar } from 'react-icons/ai';

const Section = ({title, FetchURL}) => {
    const [movies, setMovie] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(()=> {
        const fetData = async () => {
            const newUrl = `${FetchURL}${Math.floor(Math.random() * 15)}`;
            await axios.get(newUrl).then((response) => {
                setMovie(response.data.results);
            });
        };
        try{
            fetData();
        }catch{
            fetData();
        };

        setLoading(false);
    },[]);

    if(isLoading == true){
        return (
        <div className='w-full h-full p-52 fixed bg-[#001d66] z-50 flex overflow-hidden'>
            <h1 className='left-[50%] top-[50%] fixed translate-x-[-50%] translate-y-[-50%]'>Loading....</h1>
            <SVGLoaders.Puff stroke="#ffffff" width="140" height="140" className="left-[50%] top-[50%] fixed translate-x-[-50%] translate-y-[-50%]"/>
        </div>
        )
    }else{
        if(title === "Tv"){
            return (
                <div className='lg:p-10 p-2'>
                    <Link to={`/Movie-Theater-React-js/Films/${title}`} className='font-bold text-3xl md:text-3xl flex link-light w-fit hover:link-primary duration-200' data-aos="fade-up" data-aos-duration="1000">{title}<BiChevronRight className='mt-1'/></Link>
                    <div id={'slider'} className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2 lg:gap-8 md:gap-6 mt-5 flex-col" data-aos="fade-up" data-aos-duration="2000">
                        {movies.map((item, id) => {
                            if(item?.vote_average < 5){
                                return (
                                    <div key={id} className='relative rounded-xl lg:hover:scale-110 duration-200' id="movieRow" >
                                    <div className='absolute top-0 left-0 flex justify-between w-full rounded-xl p-1 z-50'>
                                        <div className='flex'>
                                            <AiOutlineStar className='text-star-yellow w-6 h-6'/>
                                            {item?.vote_average}
                                        </div>
                                        <AiOutlineHeart className='w-6 h-6'/>
                                    </div>
                                    <img className='w-full h-full rounded-xl' src={`https://image.tmdb.org/t/p/w500/${item?.poster_path}`} alt={`${item?.name}`}></img>
                                    <Link to={`Film/${item?.id}`} id={item?.id}  className='absolute w-full h-full top-0 grid duration-200 cursor-pointer'></Link>
                                </div>  
                                )

                            }else{
                                return (
                                
                                    <div key={id} className='relative rounded-xl lg:hover:scale-110 duration-200' id="movieRow" >
                                        <div className='absolute top-0 left-0 flex justify-between w-full rounded-xl p-1 z-50'>
                                            <div className='flex'>
                                                <AiFillStar className='text-star-yellow w-6 h-6'/>
                                                {item?.vote_average}
                                            </div>
                                            <AiOutlineHeart className='w-6 h-6'/>
                                        </div>
                                        <img className='w-full h-full rounded-xl' src={`https://image.tmdb.org/t/p/w500/${item?.poster_path}`} alt={`${item?.name}`}></img>
                                        <Link to={`Film/${item?.id}`} id={item?.id}  className='absolute w-full h-full top-0 grid duration-200 cursor-pointer'></Link>
                                    </div>                                     
                                )
                            }                            
                        })}
                    </div>
                </div>
            );
        }else{
            return (
                <div className='lg:p-10 p-2'>
                    <Link to={`/Movie-Theater-React-js/Films/${title}`} className='font-bold text-3xl md:text-3xl flex link-light w-fit hover:link-primary duration-200' data-aos="fade-up" data-aos-duration="1000">{title}<BiChevronRight className='mt-1'/></Link>
                    <div id={'slider'} className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2 lg:gap-8 md:gap-6 mt-5 flex-col" data-aos="fade-up" data-aos-duration="1000">
                        {movies.map((item, id) => {
                            if(item?.vote_average < 5){
                                return (
                                    <div key={id} className='relative rounded-xl lg:hover:scale-110 duration-200' id="movieRow">
                                        <div className='absolute top-0 left-0 flex justify-between w-full rounded-xl p-1 z-50'>
                                            <div className='flex'>
                                                <AiOutlineStar className='text-star-yellow w-6 h-6'/>
                                                {item?.vote_average}
                                            </div>
                                            <AiOutlineHeart className='w-6 h-6'/>
                                        </div>
                                        <img className='w-full h-full rounded-xl' src={`https://image.tmdb.org/t/p/w500/${item?.poster_path}`} alt={`${item?.title}`}></img>
                                        <Link to={`Film/${item?.id}`} id={item?.id} className='absolute w-full h-full top-0 grid duration-200 cursor-pointer rounded-xl'></Link>
                                    </div>                                        
                                )

                            }else{
                                return (
                                    <div key={id} className='relative rounded-xl lg:hover:scale-110 duration-200' id="movieRow">
                                        <div className='absolute top-0 left-0 flex justify-between w-full rounded-xl p-1 z-50'>
                                            <div className='flex'>
                                                <AiFillStar className='text-star-yellow w-6 h-6'/>
                                                {item?.vote_average}
                                            </div>
                                            <AiOutlineHeart className='w-6 h-6'/>
                                        </div>
                                        <img className='w-full h-full rounded-xl' src={`https://image.tmdb.org/t/p/w500/${item?.poster_path}`} alt={`${item?.title}`}></img>
                                        <Link to={`Film/${item?.id}`} id={item?.id} className='absolute w-full h-full top-0 grid duration-200 cursor-pointer rounded-xl'></Link>
                                    </div>                                        
                                )
                            }
                        })}
                    </div>
                </div>
            );
        };
    }
    
}
export default Section