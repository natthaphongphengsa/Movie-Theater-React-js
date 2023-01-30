import React, {useEffect, useState} from 'react'
import {requests, requestsVideo} from '../Requests'
import axios from 'axios'

export default function Main() {
    const [movies, setMovies] = useState([]);
    useEffect(()=> {
        axios.get(requests.requestUpComing).then((response) => {
            setMovies(response.data.results)
        })
    },[]);
    const randomMovie = movies[Math.floor(Math.random() * movies.length)];

    return (
        <div className='w-full h-[700px] text-white'>
            <div className='w-full h-full'>
                <div className='absolute w-full h-[700px] bg-gradient-to-r from-black'>
                    <div className='absolute top-[30%] w-full md:w-[50%] p-10' data-aos="fade-left" data-aos-duration="2000">
                        <h1 className='text-4xl'>{randomMovie?.title}</h1>
                        <div className='flex gap-2 mb-2'>
                            <button className='bg-blue-600 p-2 rounded-lg mt-2 hover:bg-blue-500'>Buy Ticket</button>
                            <button className='bg-blue-600 p-2 rounded-lg mt-2 hover:bg-blue-500'>Trailer</button>
                        </div>
                        <p>
                            Relase: {randomMovie?.release_date} 
                            <br></br> 
                            IMDB: {randomMovie?.vote_average}
                            <br></br>
                            Language: {randomMovie?.original_language}
                            <br></br>
                            <br></br>
                            {randomMovie?.overview}
                        </p>
                    </div>
                </div>
                <img className='w-full h-full object-cover bg-center' src={`https://image.tmdb.org/t/p/original/${randomMovie?.backdrop_path}`} alt={randomMovie?.title}></img>
            </div>
        </div>
    )
}