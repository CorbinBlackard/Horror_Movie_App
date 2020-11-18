
const inputElement = document.querySelector('#inputValue');
const movieSearchable = document.querySelector('#movies-searchable')
const moviesContainer = document.querySelector('#movies-container')



function movieSection(movies) {
    const section = document.createElement('section');
    section.classList = 'section';
    movies.map((movie) => {
        if (movie.poster_path) {
            const img = document.createElement('img');
            img.src = IMAGE_URL + movie.poster_path;
            img.setAttribute('data-movie-id', movie.id);

            poster = IMAGE_URL + movie.poster_path;
            title = movie.title;
            overview = movie.overview;
            release_date = movie.release_date;

            const form = document.createElement('form');
            form.setAttribute('action', '/already_seen');
            form.setAttribute('method', 'POST');
            
            const input_title = document.createElement('input');
            input_title.setAttribute('type', 'hidden');
            input_title.setAttribute('name', 'title');
            input_title.setAttribute('value', title);

            const input_poster = document.createElement('input');
            input_poster.setAttribute('type', 'hidden');
            input_poster.setAttribute('name', 'poster');
            input_poster.setAttribute('value', poster);

            const input_overview = document.createElement('input');
            input_overview.setAttribute('type', 'hidden');
            input_overview.setAttribute('name', 'overview');
            input_overview.setAttribute('value', overview);

            const input_date = document.createElement('input');
            input_date.setAttribute('type', 'hidden');
            input_date.setAttribute('name', 'release_date');
            input_date.setAttribute('value', release_date);
            
            const button = document.createElement('button');
            button.setAttribute('type', 'submit')
            button.innerHTML = "Add to Seen"
            button.setAttribute('style', 'background-color: darkred; border-radius: 10px; margin-left: -255px; margin-top: 315px;')
            
            
            form.appendChild(input_title);
            form.appendChild(input_poster);
            form.appendChild(input_overview);
            form.appendChild(input_date);
            form.appendChild(button);
            section.appendChild(img);
            section.appendChild(form);
        }
    })
    return section;
}
//* Trial and ERROR
// function createForLoop(movies) {
//     const section = document.createElement('section');
//     section.classList = 'section';
//     const watch_button = document.createElement('a');
//     console.log("YO movies: ", movies.id)
//     watch_url = `/already_seen/${movies.id}`
//     watch_button.setAttribute('href', watch_url);
//     watch_button.innerHTML = "Already Watched";
    
//     // const already_seen_button = `<a href="/already_seen" class="watch_button">Watched</a>`;
//     // section.innerHTML = already_seen_button;

//     // button_section.appendChild(watch_button);
//     section.appendChild(watch_button);
    
//     return section;
// }

function createMovieContainer(movies, title = '') {
    const movieElement = document.createElement('div');
    movieElement.setAttribute('class', 'movie');

    const header = document.createElement('h2');
    header.innerHTML = title;

    const content = document.createElement('div');
    content.classList = 'content';

    const contentClose = `<p id="content-close>X<?p>`;

    content.innerHTML = contentClose;

    const section = movieSection(movies);

    movieElement.appendChild(header);
    movieElement.appendChild(section);
    movieElement.appendChild(content);
    

    return movieElement;
}

function renderSearchMovies(data) {
    //data.result []
    movieSearchable.innerHTML = '';
    const movies = data.results;
    const movieBlock = createMovieContainer(movies);
    movieSearchable.appendChild(movieBlock)
    console.log('Data title: ', data.results.title);
}

function renderMovies(data) {
    //data.result []
    const movies = data.results;
    const movieBlock = createMovieContainer(movies, this.title);
    moviesContainer.appendChild(movieBlock)
    console.log('Data: ', data);
}

function handleError(error) {
    console.log('Error: ', error);
}
//* Search feature
// buttonElement.onclick = function(event) {
//     event.preventDefault();
//     const value = inputElement.value
//     searchMovie(value);

//     inputElement.value = "";
//     console.log('Value:', value)
// }

function createIframe(video) {
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube.com/embed/${video.key}`;
    iframe.width = 360;
    iframe.height = 315;
    iframe.allowFullscreen = true;

    return iframe;
}

function createVideoTemplate(data, content) {
    // display movie videos
    content.innerHTML = '<p id="content-close">X</p>'
        console.log('Videos: ', data);
        const videos = data.results;
        const length = videos.length > 1 ? 1 : videos.length;
        const iframeContainer = document.createElement('div');

        for ( let i = 0; i < length; i++) {
            const video = videos[i];
            const iframe = createIframe(video);
            iframeContainer.appendChild(iframe);
            content.appendChild(iframeContainer);
        }
}

//! Event Delegation
document.onclick = function(event) {
    const target = event.target;
    if (target.tagName.toLowerCase() === 'img') {
        console.log("HEY");
        console.log('Event: ', event);
        const movieId = target.dataset.movieId;
        console.log('movie id:', movieId);
        const section = event.target.parentElement;
        const content = section.nextElementSibling;
        content.classList.add('content-display');

        // const button_section = createForLoop(target);
        // section.appendChild(button_section);

        const path = `/movie/${movieId}/videos`; 
        const url = generatePathUrl(path);
        //* fetch movie videos
        fetch(url)
            .then((res) => res.json())
            .then((data) => createVideoTemplate(data, content))
            .catch((error) => {
                console.log('Error: ', error);
            });
    }

    if (target.id === 'content-close') {
        const content = target.parentElement;
        content.classList.remove('content-display')
    }
}

//* FUNCTION CALLS
getAllMovies();

getUpComingMovies();

getTopRatedMovies();

getPopularMovies();


