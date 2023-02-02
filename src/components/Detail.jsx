import {requestMovieDetail, requestTrailers} from '../Data/Requests'
import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { BrowserRouter as Router, Route, Routes, Link, useParams} from "react-router-dom";
import { BsArrow90DegLeft } from 'react-icons/bs';
import { AiFillStar, AiFillAudio } from 'react-icons/ai';
import { BiTimeFive, BiCategory, BiWorld } from 'react-icons/bi';
import { BsCalendarDateFill, BsFilm } from 'react-icons/bs';
import { MdLanguage } from 'react-icons/md';
import { TfiText } from 'react-icons/tfi';
import { FaTicketAlt } from 'react-icons/fa';


const Detail = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState([]);
    const [genres, setGenres] = useState([])
    const [languages,setLanguages] = useState([]);
    const [trailers, setTrailers] = useState([]);
    const [image, setImage] = useState(false);
    const [productions, setProducitons] = useState([]); 

    useEffect(()=> {
        axios.get(requestMovieDetail(id)).then((response) => {
            setMovie(response.data);
            setGenres(response.data.genres);
            setLanguages(response.data.spoken_languages);
            setProducitons(response.data.production_countries);
            console.log(response.data);
            if(response.data.backdrop_path != null){
                setImage(true);
            }
        })
    },[]);
    useEffect(()=> {
        axios.get(requestTrailers(id)).then((response) => {
            setTrailers(response.data.results)
        })
    },[]);

    return (
        <>
            <div className='absolute -z-50 opacity-30 h-full w-full'>
                <img className={`${image ? 'visible':'hidden'} w-full h-full object-cover bg-center`} src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`} alt={movie?.title}/>
            </div>
            <div className='pt-32 container mx-auto'>
                <div className='flex justify-start px-4 mb-8 sm:hidden md:visible lg:visible'>
                    <Link to="/Movie-Theater-React-js" className='text-white bg-transparent rounded-md hover:text-blue-500 flex duration-200'><BsArrow90DegLeft className=' w-8 h-8 mr-3'/>Back</Link>
                </div>
                <div className='flex lg:flex-row flex-col' data-aos="fade-down" data-aos-duration="1500">
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
                            <p className='flex mt-1 truncate'><AiFillAudio className='mt-1 mr-3 text-white w-6 h-6'/>Audio {languages?.map((lang,id) => (
                                <span key={id}>: {lang.english_name}</span>
                            ))}
                            </p>
                            <p className='flex mt-1'><BiCategory className='mt-1 mr-3 text-orange-600 w-6 h-6'/>Genre:{genres?.map((item,id) => (
                                <a key={id} className='text-blue-600 hover:text-blue-400 truncate' href="#">, {item.name}</a>
                                ))}
                            </p>
                            <p className='flex mt-1'><BiWorld className='mt-1 mr-3 text-blue-600 w-6 h-6'/>Contries {productions?.map((item, id) => (
                                <span key={id} className="truncate">: {item.name} </span>
                                ))}
                            </p>
                        </div>
                        <br></br>
                        <p className='text-lg'>{movie?.overview}</p>
                        <br></br>
                        <button className='bg-red-600 p-3 px-8 rounded-md hover:bg-red-500 hover:shadow-2xl hover:scale-110 duration-200 mr-4 flex'><FaTicketAlt className='w-6 h-6 mr-2'/>Tickets</button>
                    </div>
                </div>
                <br></br>
                <hr></hr>
                <div className='grid md:grid-cols-2 lg:grid-cols-1 gap-4 mt-8'>
                    {trailers?.map((item, id) => {
                        if(item.name.includes("Official Trailer") || item.name.includes("Trailer") ){
                            return (
                                <div data-aos="fade" data-aos-duration="1000" key={id}>
                                    <iframe className='video rounded-3xl' src={`https://www.youtube.com/embed/${item.key}`} title="YouTube video player" allowFullScreen="allowFullScreen"></iframe>
                                </div>
                            )
                        }
                    })}
                </div>
            </div>
        </>
    )
}
export default Detail