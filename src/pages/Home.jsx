import React from 'react'
import Header from '../components/Header'
import Section from '../components/Section'
import {requests} from '../Data/Requests'

const Home = () => {   
    return (
        <>
            <Header/>
            <Section title="Upcoming" FetchURL={requests.requestUpComing}/>
            <Section title="Popular" FetchURL={requests.requestPopular}/>
            <Section title="TopRated" FetchURL={requests.requestTopRated}/>
            <Section title="Tv" FetchURL={requests.requestTvPopular}/>
        </>
    )
}
export default Home