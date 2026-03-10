const fs = require("fs").promises;
const path = require("path");

const filePath = path.join(__dirname, "../data/stars.json");

//------------------------------------------------------------------------

const readStarsFile = async() => {
    try {
        const txt = await fs.readFile(filePath, "utf-8");
        
        if (!txt) return [];
        return JSON.parse(txt);
    } catch (error) {
        if (error.code === "ENOENT") return [];
        throw error;
    }
};

const writeStarsFile = async (stars) => {
    const data = JSON.stringify(stars, null, 2);
    await fs.writeFile(filePath,data,"utf-8");
};

//------------------------------------------------------------------------

//GET ALL STARS

const getAllStars = async () => {
    const stars = await readStarsFile();
    return stars;
}

//CREATE STAR

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