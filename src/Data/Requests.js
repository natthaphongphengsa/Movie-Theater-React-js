const key = process.env.REACT_APP_API_KEY;

const requests = {
    requestPopular: `https://api.themoviedb.org/3/movie/popular?api_key=${key}&`,
    requestTopRated: `https://api.themoviedb.org/3/movie/top_rated?api_key=${key}&`,
    requestUpComing: `https://api.themoviedb.org/3/movie/upcoming?api_key=${key}&`,
    requestTvPopular: `https://api.themoviedb.org/3/tv/popular?api_key=${key}&`,
    requestMovieGenre: `https://api.themoviedb.org/3/genre/movie/list?api_key=${key}`,
}

const requestMovieDetail = (id) => {
    return `https://api.themoviedb.org/3/movie/${id}?api_key=${key}`
}
const requestTrailers = (id) => {
    return `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${key}`
}

export {requests, requestMovieDetail, requestTrailers}