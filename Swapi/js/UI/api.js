const baseUrl = 'https://swapi.dev/api/';
const headers = {
  'Content-type': 'Application/json',
};

export const getResources = async () => {
  const res = await fetch(baseUrl, { headers });
  const resources = await res.json();

  return resources;
};

export const getData = async (resource = '') => {
  const res = await fetch(baseUrl + resource, { headers });
  const data = await res.json();

  return data;
};

export const getPerson = async (id) => {
  const res = await fetch(`${baseUrl}people/${id}/`, { headers });
  const person = await res.json();

  return person;
};

export const getPlanet = async (id) => {
  const res = await fetch(`${baseUrl}planets/${id}/`, { headers });
  const planet = await res.json();
  return planet;
};

export const getFilm = async (id) => {
  const res = await fetch(`${baseUrl}films/${id}/`, { headers });
  const film = await res.json();
  return film;
};

export const getSpecies = async (id) => {
  const res = await fetch(`${baseUrl}species/${id}/`, { headers });
  const species = await res.json();
  return species;
};

export const getStarship = async (id) => {
  const res = await fetch(`${baseUrl}starships/${id}/`, { headers });
  const starship = await res.json();
  return starship;
};

export const getVehicle = async (id) => {
  const res = await fetch(`${baseUrl}vehicles/${id}/`, { headers });
  const vehicle = await res.json();
  return vehicle;
};