const fs = require("fs").promises;
const path = require("path");
const filePath = path.join(__dirname, "../data/asteroids.js");

//----------------------------FUNCIONES FS-------------------------------------------------
const readAsteroidsFile = async () => {
    try {
        const txt = await fs.readFile(filePath, "utf-8");
        if (!txt) return [];
        return JSON.parse(txt);
    } catch (error) {
        if (error.code = "ENOENT") return [];
        return error;
    }
}

const writeAsteroidsFile = async (asteroids) => {
    const data = JSON.stringify(asteroids, null, 2);
    await fs.writeFile(filePath,data,"utf-8")
};

//-----------------------------------SERVICES--------------------------------------------

const getAllAsteroids = async ()=>{
    const asteroids = await readAsteroidsFile();

    return asteroids;
};

const createAsteroid = async (asteroidData) => {
    const asteroids = await readAsteroidsFile();

    const newAsteroid = {
        id: Date.now(),
        ...asteroidData
    }

    asteroids.push(newAsteroid);

    await writeAsteroidsFile(asteroids);

    return newAsteroid;
};

const updateAsteroid = async (id, updatedData) => {
    const asteroids = await readAsteroidsFile();

    const index = asteroids.findIndex(a => a.id === Number(id));

    if (index === -1) return null;

    asteroids[index] = {
        ...asteroids[index],
        ...updatedData
    }

    await writeAsteroidsFile(asteroids);
    return asteroids[index];
}

const deleteAsteroid = async (id) => {
    const asteroids = await readAsteroidsFile();

    const filtered = asteroids.filter(a => a.id !== Number(id));
    if (asteroids.length === filtered.length) return false;

    await writeAsteroidsFile(filtered);
    return true;
}

module.exports = {
    getAllAsteroids,
    createAsteroid,
    updateAsteroid,
    deleteAsteroid
}