import React from 'react'
import Header from '../components/Header'
import Section from '../components/Section'
import {requests} from '../Data/Requests'

const Home = () => {   
    return (
        <>
            <Header/>
            <Section title="Upcoming" FetchURL={requests.requestUpComing}/>
            <Section title="Now Playing" FetchURL={requests.requestNowPlaying}/>
            <Section title="Popular" FetchURL={requests.requestPopular}/>
            <Section title="Top Rated" FetchURL={requests.requestTopRated}/>
            <Section title="Tv" FetchURL={requests.requestTvPopular}/>
        </>
    )
}
export default Home