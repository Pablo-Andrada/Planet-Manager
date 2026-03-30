const fs = require("fs").promises;
const path = require("path");
const filePath = path.join(__dirname, "../data/moons.json");


// Funciones de fs

const readMoonsFile = async () => {
    try {
        const txt = await fs.readFile(filePath, 'utf8');
        if (!txt) return [];

        return JSON.parse(txt);

    } catch (error) {
        if (error.code = 'ENOENT') return [];

        throw error;
    }
};
const writeMoonsFile = async (planets) => {
    const data = JSON.stringify(planets, null, 2);
    await fs.writeFile(filePath,planets,'utf8')
};

//---------- services----------------

const getAllMoonsService = async () => {
        const moons = await readMoonsFile();
        // if (!moons) return [];

        return moons;  
}

const createMoonService = async (dataMoon) => {
    const moons = await readMoonsFile();

    const newMoon = {
        id : Date.now(),
        ...dataMoon
    }

    moons.push(newMoon);

    await writeMoonsFile(moons);

    return newMoon;
}

const updateMoonService = async (id, updateData) => {
    const moons = await readMoonsFile();

    index = moons.findIndex(m => m.id === Number(id));

    if (index === -1) return null;

    moons[index] = {
        ...moons[index],
        ...updateData
    }

    await writeMoonsFile(moons);
    return moons[index];
};

const deleteMoonService = async (id) => {
    const moons = await readMoonsFile();

    const filteredMoons = moons.filter(m => m.id !== Number(id));
    if (filteredMoons.length === moons.length) return false;

    await writeMoonsFile(filteredMoons);

    return true;
};

module.exports = {
    getAllMoonsService,
    createMoonService,
    updateMoonService,
    deleteMoonService
}