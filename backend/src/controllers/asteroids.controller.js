const {    getAllAsteroids,
    createAsteroid,
    updateAsteroid,
    deleteAsteroid } = require("../services/asteroid.service");
    
exports.getStarsController = async (req,res) => {
    try {        
        const asteroids = await getAllAsteroids();
        return res.status(200).json(asteroids);
    } catch (error) {
        console.error('GET /asteroids error:',error)
        return res.status(500).json({ error: 'Server error' });
    }
}