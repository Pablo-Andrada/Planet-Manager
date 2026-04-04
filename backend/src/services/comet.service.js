const fs = require('fs').promises;
const path = require('path');

const filePath = path.join(__dirname, "../data/comets.json");

//------------------------------File Sistems Functions--------------------------------------

const readCometFile = async () => {
    try {
        const txt = await fs.readFile(filePath, "utf-8");
        if (!txt) return [];
        return JSON.parse(txt);
    } catch (err) {
        if (err.code === 'ENOENT') return [];

        throw err;
    }
};

const writeCometFile = async (comets) => {
    const data = JSON.stringify(comets, null, 2);
    
    return await fs.writeFile(filePath, data, "utf-8");
}

//------------------------- Services ------------------------------

const getAllCometsService = async () => {
    const comets = await readCometFile();
    return comets;
};

const createCometService = async (dataComet) => {
    const comets = await readCometFile();

    newComet = {
        id: Date.now(),
        ...dataComet
    }

    comets.push(newComet);

    await writeCometFile(comets);
    return newComet;
};

const updateCometService = async (id, updateData) => {
    const comets = await readCometFile();

    index = comets.findIndex(c => c.id === Number(id));

    if (index === -1) return null;

    comets[index] = {
        ...comets[index],
        ...updateData
    }

    await writeCometFile(comets);
    return comets[index];

};

const deleteCometService = async(id) => {
    const comets = await readCometFile();

    const filtered = comets.filter(c=> c.id !== Number(id));

    if (comets.length === filtered.length) return false;

    await writeCometFile(filtered);
    return true;
};

module.exports = {
    getAllCometsService,
    createCometService,
    updateCometService,
    deleteCometService
}