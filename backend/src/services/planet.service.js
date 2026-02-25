// src/services/planets.service.js
// Servicio asíncrono para leer/escribir src/data/planets.json usando fs.promises
// Ventaja: no bloquea el event loop y es consistente con llamadas a DB reales.

const fs = require('fs').promises; // usamos la API de promesas
const path = require('path');

const filePath = path.join(__dirname, '../data/planets.json');

/**
 * readPlanetsFile
 * Lee el archivo planets.json de forma asíncrona y parsea JSON.
 * Si el archivo no existe o está vacío, devuelve un array vacío.
 */
const readPlanetsFile = async () => {
  try {
    const txt = await fs.readFile(filePath, 'utf8'); // asíncrono: no bloquea
    // si el archivo está vacío devolvemos []
    if (!txt) return [];
    return JSON.parse(txt);
  } catch (err) {
    // Si el error es ENOENT (archivo no existe) devolvemos []
    if (err.code === 'ENOENT') return [];
    // re-lanzamos otros errores para que el caller los maneje
    throw err;
  }
};

/**
 * writePlanetsFile
 * Sobreescribe el archivo con JSON formateado (async)
 * Notar: writeFile sobreescribe por defecto.
 */
const writePlanetsFile = async (planets) => {
  const data = JSON.stringify(planets, null, 2);
  await fs.writeFile(filePath, data, 'utf8'); // escritura asíncrona
};


// ----------------------
// Operaciones del servicio
// ----------------------

const getAllPlanets = async () => {
  const planets = await readPlanetsFile();
  return planets;
};

const createPlanet = async (planetData) => {
  const planets = await readPlanetsFile();

  // ID simple basado en timestamp (suficiente para demo)
  const newPlanet = {
    id: Date.now(),
    ...planetData
  };

  planets.push(newPlanet);

  await writePlanetsFile(planets);

  return newPlanet;
};

const updatePlanet = async (id, updatedData) => {
  const planets = await readPlanetsFile();

  const index = planets.findIndex(p => p.id === Number(id));
  if (index === -1) return null;

  planets[index] = {
    ...planets[index],
    ...updatedData
  };

  await writePlanetsFile(planets);

  return planets[index];
};

const deletePlanet = async (id) => {
  const planets = await readPlanetsFile();

  const filtered = planets.filter(p => p.id !== Number(id));

  // Si no cambió la longitud, no se encontró
  if (filtered.length === planets.length) return false;

  await writePlanetsFile(filtered);

  return true;
};

module.exports = {
  getAllPlanets,
  createPlanet,
  updatePlanet,
  deletePlanet
};