import {requestMovieDetail, requestTrailers, requestCast, requestSimilar} from '../Data/Requests'
import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { BrowserRouter as Router, Route, Routes, Link, useParams} from "react-router-dom";
import { AiFillStar, AiFillAudio, AiFillCaretDown } from 'react-icons/ai';
import { BiTimeFive, BiCategory, BiWorld, BiChevronRight } from 'react-icons/bi';
import { BsCalendarDateFill, BsFilm } from 'react-icons/bs';
import { MdLanguage, MdOutlineHideImage } from 'react-icons/md';
import { TfiText,TfiVideoClapper } from 'react-icons/tfi';
import { FaTicketAlt } from 'react-icons/fa';
import Carousel from 'react-multi-carousel';
import WithStyles from 'react-multi-carousel/lib/styles.css';
import * as SVGLoaders from 'svg-loaders-react';
import YouTube from 'react-youtube';

const Detail = () => {
    const {movie_id} = useParams();
    const [movie, setMovie] = useState([]);
    const [genres, setGenres] = useState([])
    const [languages,setLanguages] = useState([]);
    const [trailers, setTrailers] = useState([]);
    const [image, setImage] = useState(false);
    const [productions, setProducitons] = useState([]); 
    const [casts, setCasts] = useState([]);
    const [similarMovies, setSimilarMovies] = useState([]);
    const [castAvailable, setCastAvailable] = useState(false);
    const [similarAvailable, setsimilarAvailable] = useState(false);
    const [isLoading, setLoading] = useState(true);

    useEffect(()=> {
        FetchData(movie_id);
    },[]);

    const FetchData = async (movie_id) => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        await axios.get(requestMovieDetail(movie_id)).then((response) => {
            setMovie(response.data);
            setGenres(response.data.genres);
            setLanguages(response.data.spoken_languages);
            setProducitons(response.data.production_countries);
            if(response.data.backdrop_path != null){
                setImage(true);
            }
        });
        await axios.get(requestTrailers(movie_id)).then((response) => {
            setTrailers(response.data.results)
        });
        await axios.get(requestCast(movie_id)).then((response) => {
            const count = response.data.cast;
            if(count?.length > 0){
                setCastAvailable(true);
                setCasts(response.data.cast);
            }   
            else{
                setCastAvailable(false);      
            }           
        });
        const fetchUrl = requestSimilar(movie_id, Math.floor(Math.random() * 20));
        await axios.get(fetchUrl).then((response) => {            
            const count = response.data.results;
            if(count?.length > 0){
                setsimilarAvailable(true);
                setSimilarMovies(response.data.results);
            }
            else{
                setsimilarAvailable(false);
            }
        });
        setLoading(false);
    }

    const scrollTo = () => {
        const section = document.querySelector('#goToVideo');
        section.scrollIntoView( { behavior: "smooth", block: "end", inline: "nearest" } );
    }
    
    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 5,
          slidesToSlide:5
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 6,
          slidesToSlide:6
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 4,
          slidesToSlide:4
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 2,
          slidesToSlide:2
        }
    };
    
    if(isLoading == true){
        return (
        <div className='w-full h-full p-52 fixed bg-[#001d66] z-50 flex overflow-hidden'>
            <h1 className='left-[50%] top-[70%] relative translate-x-[-50%]'>Loading....</h1>
            <SVGLoaders.Puff stroke="#ffffff" width="140" height="140" className="left-[50%] top-[50%] fixed translate-x-[-50%] translate-y-[-50%]"/>
        </div>)
    }else{
        return (
            <>
                <div className='absolute -z-50 opacity-30 h-full w-full'>
                    <img className={`${image ? 'visible':'hidden'} w-full h-full object-cover bg-center`} src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`} alt={movie?.title}/>
                </div>
                <div className='pt-32 container mx-auto mb-12'>
                    <div className='flex lg:flex-row flex-col' data-aos="fade" data-aos-duration="1000">
                        <div className='px-4 mb-5 m-auto'>
                            <img className="object-fill h-full w-full rounded-3xl shadow-2xl" src={`https://image.tmdb.org/t/p/w500/${movie?.poster_path}`} alt={movie?.title}/>
                        </div>
                        <div className='px-4 lg:w-3/5'>
                            <h1 className='text-5xl truncate'>{movie?.original_title}</h1>
                            <div className='text-lg mt-4'>
                                <p className='flex mt-1 truncate'><TfiText className='mt-1 mr-3 text-blue-600 w-6 h-6'/>Title: {movie?.title}</p>
                                <p className='flex mt-1 truncate'><BsFilm className='mt-1 mr-3 text-red-600 w-6 h-6'/>Status: {movie?.status}</p>
                                <p className='flex mt-1 truncate'><BsCalendarDateFill className='mt-1 mr-3 text-green-600 w-6 h-6'/>Released: {movie?.release_date}</p>
                                <p className='flex mt-1 truncate'><BiTimeFive className='mt-1 mr-3 text-blue-600 w-6 h-6'/>Durations: {movie?.runtime} min</p>
                                <p className='flex mt-1 truncate'><AiFillStar className='mt-1 mr-3 text-star-yellow w-6 h-6'/>Stars: {movie?.vote_average}/10 IMDB</p>
                                <p className='flex mt-1 truncate'><MdLanguage className='mt-1 mr-3 text-blue-600 w-6 h-6'/>Language: {movie?.original_language}</p>
                                <p className='flex mt-1 truncate'><AiFillAudio className='mt-1 mr-3 text-white w-6 h-6'/>Audio: {languages?.map((lang,id) => (
                                    <span key={id}>, {lang.english_name}</span>
                                ))}
                                </p>
                                <p className='flex mt-1'><BiCategory className='mt-1 mr-3 text-orange-600 w-6 h-6'/>Genre:{genres?.map((item,id) => (
                                    <a key={id} className='text-blue-600 hover:text-blue-400 truncate' href="#">, {item.name}</a>
                                    ))}
                                </p>
                                <p className='flex mt-1'><BiWorld className='mt-1 mr-3 text-blue-600 w-6 h-6'/>Contries {productions?.map((item, id) => (
                                    <span key={id} className="truncate">, {item.name} </span>
                                    ))}
                                </p>
                            </div>
                            <br></br>
                            <p className='text-lg'>{movie?.overview}</p>
                            <br></br>
                            <div className='flex gap-2 sm:flex-row lg:flex-row md:flex-row flex-col'>
                                <button className='bg-red-600 p-3 px-8 rounded-md hover:bg-red-500 hover:shadow-2xl hover:scale-110 duration-200 mr-4 flex justify-center'>
                                    <FaTicketAlt className='w-6 h-6 mr-2'/>
                                    Tickets
                                </button>
                                <button onClick={scrollTo} className='bg-red-600 p-3 px-8 rounded-md hover:bg-red-500 hover:shadow-2xl hover:scale-110 duration-200 mr-4 flex justify-center'>
                                    <TfiVideoClapper className='w-6 h-6 mr-2'/>
                                    Trailer
                                </button>
                            </div>                        
                        </div>
                    </div>
                    <br></br>
                    <div className={`${castAvailable ? "visible": "hidden"} max-w-full mt-8`} data-aos="fade" data-aos-duration="1500">
                        <Link to={`Movie`} className='px-4 font-bold text-3xl md:text-3xl flex link-light w-fit hover:link-primary duration-200 mb-3'>Cast<BiChevronRight className='mt-1'/></Link>
                        <Carousel removeArrowOnDeviceType={["tablet", "mobile"]} responsive={responsive} className="lg:rounded-3xl md:rounded-3xl" keyBoardControl={true} swipeable={true} infinite="true">
                            {casts?.map((cast, id) => {                            
                                if(cast?.profile_path != null){
                                    return ( 
                                        <div key={id} className="w-full h-full duration-200 bg-black">                                
                                            <button className="h-full relative">
                                                <img src={`https://image.tmdb.org/t/p/w500${cast?.profile_path}`} className="h-full w-full"/>
                                                <div className='grid grid-cols-0 gap-0 place-items-center absolute top-0 left-0 bottom-0 duration-300 text-center w-full h-full opacity-0 hover:opacity-100 hover:backdrop-blur-xl'>
                                                    <p className='truncate w-full h-fit text-sm sm:text-sm lg:text-xl md:text-xl'>
                                                        {cast?.name}<br></br>
                                                        Character<br></br>
                                                        <AiFillCaretDown className='m-auto'/>
                                                        {cast?.character}
                                                    </p>
                                                </div>
                                            </button>
                                        </div>
                                    )
                                }
                                return(
                                    <div key={id} className="w-full h-full duration-200 bg-white"> 
                                        <button className="h-full w-full relative">
                                            <MdOutlineHideImage className='text-red-600 w-full h-full'/> 
                                            <div className='grid grid-cols-0 gap-0 place-items-center absolute top-0 left-0 bottom-0 duration-300 text-center w-full h-full opacity-0 hover:opacity-100 hover:backdrop-blur-xl'>
                                                <p className='truncate w-full h-fit text-sm sm:text-sm lg:text-xl md:text-xl text-slate-600'>
                                                    {cast?.name}<br></br>
                                                    Character<br></br>
                                                    <AiFillCaretDown className='m-auto'/>
                                                    {cast?.character}
                                                </p>
                                            </div>
                                        </button>                              
                                    </div>
                                )
                             
                            })}
                        </Carousel>
                    </div>
                    <div className='grid md:grid-cols-1 lg:grid-cols-1 gap-4 mt-14' id="goToVideo">
                        {trailers?.map((item, id) => {
                            if(item.name.includes("Official Trailer") || item.name.includes("Trailer") ){
                                return (
                                    <div data-aos="zoom-in" data-aos-duration="1500" key={id}>
                                        <YouTube key={id} iframeClassName="rounded-3xl" className='video mb-24 rounded-3xl' videoId={item.key} opts={{height: '100%', width: '100%',}}></YouTube>
                                    </div>
                                )
                            }
                        })}
                    </div>
                    <div className={`${similarAvailable ? "visible": "hidden"} max-w-full mt-8`} data-aos="fade" data-aos-duration="1500">
                        <Link to={`Movie`} className='px-4 font-bold text-3xl md:text-3xl flex link-light w-fit hover:link-primary duration-200 mb-3'>Similar<BiChevronRight className='mt-1'/></Link>
                        <Carousel removeArrowOnDeviceType={["tablet", "mobile"]} responsive={responsive} className="lg:rounded-3xl md:rounded-3xl" keyBoardControl={true} swipeable={true} infinite="true">
                            {similarMovies?.map((similar, id) => {
                                if(similar?.poster_path != null){
                                    return (
                                        <div key={id} className="w-full h-full duration-200 p-2 lg:rounded-3xl">                                
                                            <button onClick={() => FetchData(similar?.id)} key={id} className="h-full w-full relative">
                                                <img src={`https://image.tmdb.org/t/p/w500${similar?.poster_path}`} className="h-full w-full lg:rounded-3xl"/>
                                            </button>
                                        </div>
                                    )
                                }
                                return (
                                    <div className="w-full h-full duration-200 p-2 lg:rounded-3xl">  
                                        <div className='bg-white w-full h-full lg:rounded-3xl'>
                                            <button onClick={() => FetchData(similar?.id)} key={id} className="h-full w-full relative">
                                                <MdOutlineHideImage className='text-red-600 w-full h-full'/> 
                                                <div className='grid grid-cols-0 gap-0 place-items-center absolute top-0 left-0 bottom-0 duration-300 text-center w-full h-full rounded-3xl opacity-0 sm:opacity-100 lg:hover:opacity-100 hover:backdrop-blur-xl'>
                                                        <p className='truncate w-full h-fit text-sm sm:text-sm lg:text-xl md:text-xl text-slate-600'>
                                                            {similar?.title}<br></br>
                                                            IMDB: {similar?.vote_average}
                                                        </p>
                                                </div>
                                            </button >
                                        </div>                              
                                    </div>
                                )
                            })}
                        </Carousel>
                    </div>
                </div>
            </>
        )
    }
}
export default Detail