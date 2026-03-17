const fs = require("fs").promises;
const path = require("path");

const filePath = path.join(__dirname, "../data/asteroids.json");


//----------------------------FUNCIONES FS-------------------------------------------------
const readAsteroidsFile = async () => {
    try {
        const txt = await fs.readFile(filePath, "utf-8");
        //si no hay nada en txt
        if (!txt) return [];
        return JSON.parse(txt);
    } catch (error) {
        if (error.code = "ENOENTE") return [];
        return error;
    }
};

const writeAsteroidsFile = async (asteroids) => {
    const data = JSON.stringify(asteroids, null, 2);
    await fs.writeFile(filePath, data, "utf-8");
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
    };

    asteroids.push(newAsteroid);

    await writeAsteroidsFile(newAsteroid);

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