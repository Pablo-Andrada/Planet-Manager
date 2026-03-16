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

