const fs = require("fs").promises;
const path = require("path");

const filePath = path.join(__dirname, "../data/stars.json");

//------------FUNCIONES PARA FS----------------------------------------
const readStarsFile = async () => {
    try {
        const txt = await fs.readFile(filePath, "utf-8");
    
        if (!txt) return [];
        //esta en JSON asique lo tenemos que pasar a JavaScript
        return JSON.parse(txt);
    } catch (error) {
        if (error.code === "ENOENT") return [];
        throw error;
    }

};

const writeStarsFile = async (stars) => {
    const data = JSON.stringify(stars, null, 2);
    await fs.writeFile(filePath, data, "utf-8");
}

//---------------------------SERVICES-----------------------------------

const getAllStars = async () => {
    const stars = await readStarsFile();
    return stars;
}

const createStar = async (starData) => {
    const stars = await readStarsFile();
    
    const newStar = {
        id: Date.now(),
        ...starData
    }

    stars.push(newStar);

    await writeStarsFile(stars);

    return newStar;

}

const updateStar = async (id, updatedData) => {
    const stars = await readStarsFile();

    const index = stars.findIndex(s => s.id === Number(id));
    if (index === -1) return null;

    stars[index] = {
        ...stars[index],
        ...updatedData
    };

    await writeStarsFile(stars);
    return stars[index];
}

const deleteStar = async (id) => {
    const stars = await readStarsFile();

    const filtered = stars.filter(s => s.id !== Number(id));

    if (stars.length === filtered.length) return false;

    await writeStarsFile(filtered);

    return true;
};

module.exports = {
    getAllStars,
    createStar,
    updateStar,
    deleteStar
};