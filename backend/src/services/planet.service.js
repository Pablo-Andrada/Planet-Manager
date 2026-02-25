// implementamos el módulo fs para trabajar con archivos
import fs from "fs";
//importamos el path para construir rutas seguras del sistema
import path from "path";
//Construimos la ruta absoluta al archivo planets.json
const filePath = path.join(__dirname, "../data/planets.json");

// ------------------------------
// FUNCIÓN PARA LEER EL ARCHIVO
// ------------------------------
const readPlanetsFile = () => {
    //Leemos el archivo como texto
    const data = fs.readFileSync(filePath, "utf-8");

    //Convertimos el texto JSON a objeto JavaScript
    return JSON.parse(data);
}

// ------------------------------
// FUNCIÓN PARA ESCRIBIR EN EL ARCHIVO
// ------------------------------
const writePlanetsFile = (planets) => {
  // Convertimos el array a JSON formateado
  const data = JSON.stringify(planets, null, 2);

  // Sobreescribimos el archivo
  fs.writeFileSync(filePath, data);
};
// ------------------------------
// OBTENER TODOS LOS PLANETAS
// ------------------------------
const getAllPlanets = () => {
    return readPlanetsFile();
};
// ------------------------------
// CREAR PLANETA
// ------------------------------
const createPlanet = (planetData) => {
    const planets = readPlanetsFile();

    const newPlanet = {
        id: Date.now(), // ID simple basado en timestamp
        ...planetData
    };

    planets.push(newPlanet);
    writePlanetsFile(planets);

    return newPlanet;
};

// ------------------------------
// ACTUALIZAR PLANETA
// ------------------------------
const updatePlanet = (id,updatedData) => {
    const planets = readPlanetsFile();

    planets.findIndex(p => p.id === Number(id));
    
    if (index === -1) return null;

    planets[index] = {
        ...planets[index],
        ...updatedData
    };
    writePlanetsFile(planets);
    return planets[index];
};
// ------------------------------
// ELIMINAR PLANETA
// ------------------------------
const deletePlanet = (id) => {
    const planets = readPlanetsFile();

    const filtered = planets.filter(p => p.id !== Number(id));

    if (filtered.length === planets.length) return false;

    writePlanetsFile(filtered);

    return true;

};
module.exports = {
    getAllPlanets,
    createPlanet,
    updatePlanet,
    deletePlanet
}