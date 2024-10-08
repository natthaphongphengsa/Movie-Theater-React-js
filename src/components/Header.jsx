import React, {useEffect, useState, useRef} from 'react'
import {requests, requestTrailers} from '../Data/Requests'
import axios from 'axios'
import {BsPlayCircle} from 'react-icons/bs'
import { FaPlay } from 'react-icons/fa';
import * as SVGLoaders from 'svg-loaders-react';
import YouTube from 'react-youtube';


const Main = () =>  {
    const [trailer, setTrailers] = useState([]);
    const [randomMovie, setRandomMovie] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(()=> {
        fetchData(null);
    },[]);
        
    const fetchData = async (id) => {
        
        if(id == null){            
            const fristLoad = requests.requestUpComing.toString() + "1".toString();

            const getData = async () => {             
                await axios.get(fristLoad).then((response) => {    
                    const randomFilmArray = Math.floor(Math.random() * (response.data.results.length - 1) + 1);

                    setRandomMovie(response.data.results[randomFilmArray]);
                })
            };

            getData();  
        }
        else{
            const FetchUrl = requestTrailers(id);
            const getTrailer = async () => {
                await axios.get(FetchUrl).then((response) => {
                    setTrailers(response.data.results);
                });
            };
            getTrailer();
        }
        setLoading(false);      
    }

    const unloadVideo = () => {        
        setTrailers([]);
    };
    
    if(isLoading == true){
        return (
        <div className='w-full h-full p-52 fixed bg-[#001d66] z-50 flex overflow-hidden'>
            <h1 className='left-[50%] top-[50%] fixed translate-x-[-50%] translate-y-[-50%]'>Loading....</h1>
            <SVGLoaders.Puff stroke="#ffffff" width="140" height="140" className="left-[50%] top-[50%] fixed translate-x-[-50%] translate-y-[-50%]"/>
        </div>
        )
    }
    else{
        return (
            <div className='w-full h-[1200px] text-white'>
                <div className='w-full h-full'>
                    <div className='absolute w-full h-[1200px] bg-gradient-to-r from-black'>
                        <div className='absolute lg:top-[30%] top-[25%] w-full md:w-[50%] lg:p-10 p-2' data-aos="fade-left" data-aos-duration="1000">
                            <h1 className='text-4xl'>{randomMovie?.title}</h1>
                            <div className='flex gap-2 mb-2'>
                            <button onClick={() => fetchData(randomMovie?.id)} className='bg-red-600 p-3 px-8 mt-2 rounded-md hover:bg-red-500 hover:shadow-2xl hover:scale-110 duration-200 mr-4 flex justify-center' data-bs-toggle="modal" data-bs-target="#videoplayer"><FaPlay className='w-6 h-6 mr-2'/>
                            Trailer</button>   
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

                        <div className="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto" id="videoplayer" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                            <div className="modal-dialog relative w-auto pointer-events-none">
                                <div className="modal-content border-none shadow-lg relative lg:h-full md:h-full sm:h-full h-[100vh] flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
                                    <div className="modal-header flex flex-shrink-0 items-center justify-center rounded-t-md">
                                        <button onClick={unloadVideo} type="button" className="btn-close btn-close-white w-20 h-20 text-3xl text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body relative sm:pl-0 sm:pr-0 md:pr-24 md:pl-24 lg:pl-52 lg:pr-52 p-0">
                                        {trailer?.map((item,id) => {
                                             if(item.name.includes("Official Trailer") || item.name.includes("Trailer") ){
                                                return (
                                                    <YouTube key={id} iframeClassName="rounded-3xl" className='video mb-24 rounded-3xl lg:aspect-video md:aspect-video sm:aspect-video' videoId={item.key} opts={{height: '100%', width: '100%',}}></YouTube>
                                                )
                                            }
                                           })
                                        }
                                       
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <img className='w-full h-full object-cover bg-center' src={`https://image.tmdb.org/t/p/original${randomMovie?.backdrop_path}`} alt={randomMovie?.title}></img>
                </div>  
            </div>
        )
    }
}
export default Main