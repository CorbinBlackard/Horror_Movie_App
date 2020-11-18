// Intial Values
const API_KEY = '5733fa2506a281a8f7aeaa95a692b7f7'
const IMAGE_URL = 'https://image.tmdb.org/t/p/w500'

const url = 'https://api.themoviedb.org/3/search/movie?api_key=5733fa2506a281a8f7aeaa95a692b7f7&';


function generateUrl(path, random_page_number) {
    const url = `https://api.themoviedb.org/3${path}?api_key=5733fa2506a281a8f7aeaa95a692b7f7&with_genres=27&page=${random_page_number}`; // &with_genres=53 (adds thriller movies)
    // const url = `https://api.themoviedb.org/3${path}?api_key=5733fa2506a281a8f7aeaa95a692b7f7&sort_by=popularity.desc&page=2`; //*reference
    return url;
}

function generatePathUrl(path) {
    const url = `https://api.themoviedb.org/3${path}?api_key=5733fa2506a281a8f7aeaa95a692b7f7&`;
    return url;
}

function requestMovies(url, onComplete, onError) {
    fetch(url)
        .then((res) => res.json())
        .then(onComplete)
        .catch(onError);
}

function searchMovie(value) {
    const path = '/search/movie';
    const url = generatePathUrl(path) + '&query=' + value;

    requestMovies(url, renderSearchMovies, handleError);
}

function getUpComingMovies() {
    const path = '/movie/upcoming';
    const random_page_number = 1;
    const url = generateUrl(path, random_page_number) 

    const render = renderMovies.bind({title: 'Upcoming Horror Movies'})
    requestMovies(url, render, handleError);
}

function getTopRatedMovies () {
    const path = '/movie/top_rated';
    const random_page_number = Math.floor(Math.random() * 3) + 1;
    const url = generateUrl(path, random_page_number)

    const render = renderMovies.bind({title: 'Top Rated Horror Movies'})
    requestMovies(url, render, handleError);
}

function getPopularMovies() {
    const path = '/movie/popular';
    const random_page_number = Math.floor(Math.random() * 3) + 1;
    const url = generateUrl(path, random_page_number)

    const render = renderMovies.bind({title: 'Popular Horror Movies'})
    requestMovies(url, render, handleError);
}

function getAllMovies() {
    const path = '/discover/movie';
    const random_page_number = Math.floor(Math.random() * 200);
    const url = generateUrl(path, random_page_number)

    const render = renderMovies.bind({title: 'All'})
    const allmovies = requestMovies(url, render, handleError);
    return allmovies
}

