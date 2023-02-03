const apiKey = process.env.REACT_APP_API_KEY;

const requests = {
    requestPopular: `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=`,
    requestTopRated: `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&page=`,
    requestUpComing: `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&page=`,
    requestTvPopular: `https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}&page=`,
    requestMovieGenre: `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`,
}

const requestMovieDetail = (movie_id) => {
    return `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${apiKey}`
}
const requestTrailers = (movie_id) => {
    return `https://api.themoviedb.org/3/movie/${movie_id}/videos?api_key=${apiKey}`
}
const requestCast = (movie_id) => {
    return `https://api.themoviedb.org/3/movie/${movie_id}/credits?api_key=${apiKey}`;
}
const requestSimilar = (movie_id, page_num) => {
    return `https://api.themoviedb.org/3/movie/${movie_id}/similar?api_key=${apiKey}&page=${page_num}`
}
const requestSearchMovie = (query, page_num) => {
    return `https://api.themoviedb.org/3/search/movie?api_key=be76a96804dad9c25a604d69639cf845&query=${query}&page=${page_num}`
}

export {requests, requestMovieDetail, requestTrailers, requestCast, requestSimilar, requestSearchMovie}