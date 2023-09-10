import { getData, getPerson, getPlanet, getFilm, getSpecies, getVehicle, getStarship } from './api.js';
import { getHash } from '../utils/utils.js';

const doc = document;

export const renderData = async () => {
  const hash = getHash().replace('/', '');

  if (!hash) {
    return;
  }

  const dataHtmlEl = doc.querySelector('.data');
  dataHtmlEl.innerHTML = '';

  switch (hash) {
    case 'people':
      const peopleList = await getData(hash);
      for (const person of peopleList.results) {
        const personItem = createDataItem(person.name);
        personItem.addEventListener('click', async () => {
          const detailedPerson = await getPerson(getIdFromURL(person.url));
          openPersonDetailWindow(detailedPerson);
        });
        dataHtmlEl.appendChild(personItem);
      }
      break;

    case 'planets':
      const planetsList = await getData(hash);
      for (const planet of planetsList.results) {
        const planetItem = createDataItem(planet.name);
        planetItem.addEventListener('click', async () => {
          const detailedPlanet = await getPlanet(getIdFromURL(planet.url));
          openPlanetDetailWindow(detailedPlanet);
        });
        dataHtmlEl.appendChild(planetItem);
      }
      break;

    case 'films':
      const filmsList = await getData(hash);
      for (const film of filmsList.results) {
        const filmItem = createDataItem(film.title);
        filmItem.addEventListener('click', async () => {
          const detailedFilm = await getFilm(getIdFromURL(film.url));
          openFilmDetailWindow(detailedFilm);
        });
        dataHtmlEl.appendChild(filmItem);
      }
      break;

    case 'species':
      const speciesList = await getData(hash);
      for (const specie of speciesList.results) {
        const specieItem = createDataItem(specie.name);
        specieItem.addEventListener('click', async () => {
          const detailedSpecie = await getSpecies(getIdFromURL(specie.url));
          openSpecieDetailWindow(detailedSpecie);
        });
        dataHtmlEl.appendChild(specieItem);
      }
      break;

    case 'vehicles':
      const vehiclesList = await getData(hash);
      for (const vehicle of vehiclesList.results) {
        const vehicleItem = createDataItem(vehicle.name);
        vehicleItem.addEventListener('click', async () => {
          const detailedVehicle = await getVehicle(getIdFromURL(vehicle.url));
          openVehicleDetailWindow(detailedVehicle);
        });
        dataHtmlEl.appendChild(vehicleItem);
      }
      break;

    case 'starships':
      const starshipsList = await getData(hash);
      for (const starship of starshipsList.results) {
        const starshipItem = createDataItem(starship.name);
        starshipItem.addEventListener('click', async () => {
          const detailedStarship = await getStarship(getIdFromURL(starship.url));
          openStarshipDetailWindow(detailedStarship);
        });
        dataHtmlEl.appendChild(starshipItem);
      }
      break;

    default:
      const data = await getData(hash);
      console.log(data);
  }
};

function createDataItem(text) {
  const dataItem = document.createElement('li');
  dataItem.classList.add('data-item');
  dataItem.textContent = text;
  return dataItem;
}

function getIdFromURL(url) {
  const parts = url.split('/');
  return parts[parts.length - 2];
}

function openPersonDetailWindow(person) {
  const detailWindow = window.open('', 'PersonDetail', 'width=400,height=400');
  detailWindow.document.write(`
    <h3>Name: ${person.name}</h3>
    <p>Height: ${person.height}</p>
    <p>Hair Color: ${person.hair_color}</p>
    <p>Skin Color: ${person.skin_color}</p>
  `);
}

function openPlanetDetailWindow(planet) {
  const detailWindow = window.open('', 'PlanetDetail', 'width=400,height=400');
  detailWindow.document.write(`
    <h3>Name: ${planet.name}</h3>
    <p>Climate: ${planet.climate}</p>
    <p>Terrain: ${planet.terrain}</p>
  `);
}

function openFilmDetailWindow(film) {
  const detailWindow = window.open('', 'FilmDetail', 'width=400,height=400');
  detailWindow.document.write(`
    <h3>Title: ${film.title}</h3>
    <p>Director: ${film.director}</p>
    <p>Producer: ${film.producer}</p>
    <p>Release Date: ${film.release_date}</p>
    `);
}

function openSpecieDetailWindow(specie) {
  const detailWindow = window.open('', 'SpecieDetail', 'width=400,height=400');
  detailWindow.document.write(`
    <h3>Name: ${specie.name}</h3>
    <p>Classification: ${specie.classification}</p>
    <p>Designation: ${specie.designation}</p>
  `);
}

function openVehicleDetailWindow(vehicle) {
  const detailWindow = window.open('', 'VehicleDetail', 'width=400,height=400');
  detailWindow.document.write(`
    <h3>Name: ${vehicle.name}</h3>
    <p>Model: ${vehicle.model}</p>
    <p>Vehicle Class: ${vehicle.vehicle_class}</p>
  `);
}

function openStarshipDetailWindow(starship) {
  const detailWindow = window.open('', 'StarshipDetail', 'width=400,height=400');
  detailWindow.document.write(`
    <h3>Name: ${starship.name}</h3>
    <p>Model: ${starship.model}</p>
    <p>Manufacturer: ${starship.manufacturer}</p>
    <p>Starship Class: ${starship.starship_class}</p>
  `);
}
