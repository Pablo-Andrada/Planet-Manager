const fs = require("fs").promises;
const path = require("path");

const filePath = path.join(__dirname, "../data/planets.json")


const readPlanetsFile = async () => {
    try {
        const txt = await fs.readFile(filePath, "utf-8");
        if (!txt) return []
        return JSON.parse(txt);
    } catch (err) {
        if (err.code === "ENOENT") return [];
        throw err;
    }
}

const writePlanetsFile = async (planets) => {
    const data = JSON.stringify(planets, null, 2);

    await fs.writeFile(filePath, data, "utf-8");
}