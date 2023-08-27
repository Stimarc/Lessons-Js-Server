const doc = document;

const token = 'AG6ZB3T-N6N4CK6-K9YTRZ2-AFMG0BX';

const baseUrl = 'https://api.kinopoisk.dev';
const headers = {
    'accept': 'application/json'
};

const resourses = {
    health: '/v1/health',
    movies: {
        movie: '/v1.3/movie?page=2&limit=10'
    }
};

const itemsPerPage = 10;
let currentPage = 1;
let sortBy = 'year'; 
let data; 

// 
const prevBtn = doc.querySelector('.prev-btn');
const nextBtn = doc.querySelector('.next-btn');

prevBtn.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        renderMovies(data.docs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage), '.films');
    }
});

nextBtn.addEventListener('click', () => {
    if (currentPage < Math.ceil(data.docs.length / itemsPerPage)) {
        currentPage++;
        renderMovies(data.docs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage), '.films');
    }
});

// 
const sortRadios = doc.querySelectorAll('[name="sort"]');
sortRadios.forEach(radio => {
    radio.addEventListener('change', event => {
        sortBy = event.target.value;
        data.docs.sort((a, b) => {
            if (sortBy === 'year') return a.year - b.year;
            if (sortBy === 'rating') return b.rating.kp - a.rating.kp;
            if (sortBy === 'name') return a.name.localeCompare(b.name);
        });
        currentPage = 1;
        renderMovies(data.docs.slice(0, itemsPerPage), '.films');
    });
});

getMovies()
    .then(movieData => {
        data = movieData;
        renderMovies(data.docs.slice(0, itemsPerPage), '.films');
        data.docs.sort((a, b) => a.year - b.year);
    });

async function getMovies(page = 1) {
    const url = `${baseUrl}${resourses.movies.movie}?page=${page}&limit=${itemsPerPage}`;
    headers['X-API-KEY'] = token;

    try {
        const res = await fetch(url, { headers });
        const data = await res.json();

        console.log(data);
        return data;
    } catch (err) {
        console.warn('failed request', err);
    }
}

function renderMovies(filmsArr, parentElSelector) {
    const parentEl = doc.querySelector(parentElSelector);
    parentEl.innerHTML = ''; 

    filmsArr.forEach(film => rendeMovie(film, parentElSelector));
}

function rendeMovie(filmObj, parentElSelector) {
    const parentEl = doc.querySelector(parentElSelector);
    const film = doc.createElement('div');

    const {
        alternativeName,
        countries,
        description,
        genres,
        name,
        rating,
        year,
    } = filmObj;

    const countriesHtmlEL = 
        countries
            .map(country => `<li class="film__country">${country.name}</li>`)
            .join('');

    const genresHtmlEL = 
        genres
            .map(genre => `<li class="film__genre">${genre.name}</li>`)
            .join('');

    film.className = 'film';
    film.innerHTML =
    `
        <div class="film__front">
            <div class="film__header mb-2">
                <h3 class="film__name">${ name }</h3>
                <p class="film__alt-name mb-2">${ alternativeName }</p>
                <p class="film__year">${ year }</p>
            </div>
        </div>

        <ul class="film__countries mb-a">
            ${ countriesHtmlEL }
        </ul>

        <ul class="film__genres mb-2 mt-2">
            ${ genresHtmlEL }
        </ul>

        <div class="film__back">
            <h3 class="film__name mb-2">${ name }</h3>
            <p class="film__description">
                ${ description }
            </p>
        </div>

        <ul class="film__rates">
            <li class="film__rate">
                <span>kp:</span>
                <span>8.978</span>
            </li>
            <li class="film__rate">
                <span>imdb</span>
                <span>9.2</span>
            </li>
        </ul>
    `;

    parentEl.append(film);
}

async function getMovies() {
    const url = baseUrl + resourses.movies.movie;

    headers['X-API-KEY'] = token;

    try {
        const res = await fetch(url, { headers });
        const data = await res.json();

        console.log(data);
        return data;
    } catch (err) {
        console.warn('failed request', err);
    }
}

async function getHealth() {
    const url = baseUrl + resourses.health;
    try {
        const res = await fetch(url, { headers });
        const data = await res.json();

        console.log(data);
    } catch (err) {
        console.warn('failed request', err);
    }

}

