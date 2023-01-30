
const key = 'be76a96804dad9c25a604d69639cf845';
const requests = {
    requestPopular: `https://api.themoviedb.org/3/movie/popular?api_key=${key}&page=1`,
    requestTopRated: `https://api.themoviedb.org/3/movie/top_rated?api_key=${key}&page=1`,
    requestUpComing: `https://api.themoviedb.org/3/movie/upcoming?api_key=${key}&page=1`,
    requestTvPopular: `https://api.themoviedb.org/3/tv/popular?api_key=${key}&page=1`,
    requestMovieGenre: `https://api.themoviedb.org/3/genre/movie/list?api_key=${key}`,
}

const requestMovieDetail = (id) => {
    return `https://api.themoviedb.org/3/movie/${id}?api_key=${key}`
}
const requestTrailers = (id) => {
    return `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${key}`
}

export {requests, requestMovieDetail, requestTrailers}