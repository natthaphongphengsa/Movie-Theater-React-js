import {requests, requestMovieDetail} from '../Requests'
import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { BrowserRouter as Router, Route, Routes, Link, useParams} from "react-router-dom";

const Detail = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState([]);
    const [genre, setGenres] = useState([])
    useEffect(()=> {
        axios.get(requestMovieDetail(id)).then((response) => {
            setMovie(response.data)
            setGenres(response.data.genres)
        })
    },[]);
    console.log(movie);
    return (
        <>
            <div className='fixed -z-50 opacity-40'>
                <img className='w-full h-full object-cover bg-center' src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`} alt={movie?.title}/>
            </div>
            <div className='pt-60 p-5 container mx-auto px-10'>
                <div className='flex justify-start px-4 mb-8'>
                    <Link to="/" className='text-white bg-blue-600 p-2 rounded-md hover:bg-blue-500'>Go Back</Link>
                </div>
                <div className='flex lg:flex-row flex-col'>
                    <div className='flex justify-center w-full px-4 mb-5'>
                        <img id="movieRow" className="lg:w-fit w-full object-cover h-full rounded-md" src={`https://image.tmdb.org/t/p/original/${movie?.poster_path}`} alt={movie?.title}/>
                    </div>
                    <div className='px-4'>
                        <h1 className='text-4xl'>{movie?.title}</h1>
                        <p className='text-lg'>
                            Status: {movie?.status}<br></br>
                            Release date: {movie?.release_date}<br></br>
                            Durations: {movie?.runtime} min <br></br>
                            Imdb: {movie?.vote_average} <br></br>
                            Original language: {movie?.original_language}<br></br>
                            Genres: {genre.map((item,id) => (
                                <a className='' href="#">{item.name} </a>
                            ))}
                        </p>
                        <br></br>
                        <p className='text-lg'>{movie?.overview}</p>
                        <br></br>
                        <button className='bg-red-600 p-3 px-8 rounded-md hover:bg-red-500'>Tickets</button>
                    </div>
                </div>
                <div className=''>
                    <iframe className='w-full h-full'></iframe>
                </div>
            </div>
        </>
    )
}
export default Detail