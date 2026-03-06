const { getAllPlanets2 } = require("../services/planet.service");

exports.getPlanetsController = async(req,res) => {
    try {
        const planets = await getAllPlanets2();
        return res.status(200).json(planets);
    } catch (error) {
        console.error("GET/planets error: ", error);
        return res.status(500).json({error: "Server error"})
    }
}