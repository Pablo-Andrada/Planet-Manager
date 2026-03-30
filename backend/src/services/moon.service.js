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
    await fs.writeFile(filePath, data, 'utf8')
};