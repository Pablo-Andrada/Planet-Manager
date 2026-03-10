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

//GETALLPLANETS
// Devuelve todos los planetas guardados en el archivo JSON.
// -> [] si no hay archivo o está vacío (ese comportamiento lo maneja readPlanetsFile).
const getAllPlanets = async () => {
  // readPlanetsFile() es la utilidad que lee el JSON y devuelve un array de planets (o [] por defecto).
  const planets = await readPlanetsFile();
  return planets; // retorno directo; nunca modifica el array original aquí.
};
//---------------------------------------------------------------------------------------

// CREATEPLANET
// Crea un nuevo planeta con los datos recibidos y lo persiste en el JSON.
// Devuelve el planeta recién creado (incluyendo id).
const createPlanet = async (planetData) => {
  // Leemos la lista actual
  const planets = await readPlanetsFile();

  // ID simple basado en timestamp (suficiente para demo).
  // Atención: Date.now() puede colisionar si se crean varios en el mismo ms.
  const newPlanet = {
    id: Date.now(),    // recomendación: usar UUID para evitar colisiones en producción
    ...planetData      // merge de los campos proporcionados (name, mass, etc.)
  };

  // Añadimos al array en memoria
  planets.push(newPlanet);

  // Persistimos el array actualizado al archivo
  await writePlanetsFile(planets);

  // Devolvemos el recurso creado
  return newPlanet;
};
//----------------------------------------------------------------------------------------
// UPDATEPLANET

// Actualiza el planeta con id dado usando updatedData.
// Devuelve el planeta actualizado, o null si no existe.
const updatePlanet = async (id, updatedData) => {
  // Leemos la lista actual
  const planets = await readPlanetsFile();

  // Buscamos el índice del planeta cuyo id coincide.
  // Number(id) convierte 'id' si viene como string; asegúrate del tipo que usás para ids.
  const index = planets.findIndex(p => p.id === Number(id));
  if (index === -1) return null; // no encontrado

  // Merge: conserva propiedades previas y sobrescribe con updatedData
  planets[index] = {
    ...planets[index],
    ...updatedData
  };

  // Guardamos los cambios en disco
  await writePlanetsFile(planets);

  // Devolvemos el objeto actualizado
  return planets[index];
};
//-----------------------------------------------------------------------------------------
    // DELETE PLANET
// Elimina el planeta por id. Devuelve true si se eliminó, false si no se encontró.
const deletePlanet = async (id) => {
  // Leemos la lista actual
  const planets = await readPlanetsFile();

  // Filtramos todos los planetas que NO tengan el id indicado (conversión a Number)
  const filtered = planets.filter(p => p.id !== Number(id));

  // Si no cambió la longitud, significa que no se encontró el id
  if (filtered.length === planets.length) return false;

  // Guardamos el array filtrado (sin el planeta eliminado)
  await writePlanetsFile(filtered);

  return true;
};

module.exports = {
  getAllPlanets,
  createPlanet,
  updatePlanet,
  deletePlanet
};