import { getData, getPerson, getPlanet } from './api.js';
import { getHash } from '../utils/utils.js';

const doc = document;

export const renderData = async () => {
  const hash = getHash().replace('/', '');

  if (!hash) {
    return;
  }

  if (hash === 'people') {
    const peopleList = await getData(hash);
    const dataHtmlEl = doc.querySelector('.data');
    dataHtmlEl.innerHTML = '';

    for (const person of peopleList.results) {
      const personItem = document.createElement('li');
      personItem.classList.add('data-item');
      personItem.textContent = person.name;

      personItem.addEventListener('click', async () => {
        const detailedPerson = await getPerson(getPersonIdFromURL(person.url));
        openPersonDetailWindow(detailedPerson);
      });

      dataHtmlEl.appendChild(personItem);
    }
  } else if (hash === 'planets') {
    const planetsList = await getData(hash);
    const dataHtmlEl = doc.querySelector('.data');
    dataHtmlEl.innerHTML = '';

    for (const planet of planetsList.results) {
      const planetItem = document.createElement('li');
      planetItem.classList.add('data-item');
      planetItem.textContent = planet.name;

      planetItem.addEventListener('click', async () => {
        const planetId = getPlanetIdFromURL(planet.url);
        const detailedPlanet = await getPlanet(planetId);
        openPlanetDetailWindow(detailedPlanet);
      });

      dataHtmlEl.appendChild(planetItem);
    }
  } else {
    const data = await getData(hash);
    console.log(data);
  }
};

function getPersonIdFromURL(url) {
  const parts = url.split('/');
  return parts[parts.length - 2];
}

export function getPlanetIdFromURL(url) {
  const parts = url.split('/');
  return parts[parts.length - 2];
}

function openPersonDetailWindow(person) {
  const detailWindow = window.open('', 'PersonDetail', 'width=400,height=400');
  detailWindow.document.write(`
    <h3>Name: ${person.name}</h3>
    <p>Height: ${person.height}</p>
    <p>Hair Color: ${person.hair_color}</p>
    <!-- Додайте інші дані, які вас цікавлять для персонажів -->
  `);
}

function openPlanetDetailWindow(planet) {
  const detailWindow = window.open('', 'PlanetDetail', 'width=400,height=400');
  detailWindow.document.write(`
    <h3>Name: ${planet.name}</h3>
    <p>Climate: ${planet.climate}</p>
    <p>Terrain: ${planet.terrain}</p>
    <!-- Додайте інші дані, які вас цікавлять для планет -->
  `);
}
