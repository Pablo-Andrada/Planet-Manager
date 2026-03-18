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
exports.createAsteroidController = async (req, res) => {
    try {
        const { name, diameter, hasLife } = req.body;
        if (!name || diameter === undefined) {
            return res.status(400).json({ error: 'Name and diameter are required' });
        }

        const newAsteroid = await createAsteroid({ name, diameter, hasLife });
        return res.status(201).json(newAsteroid);
    } catch (error) {
        console.error('POST /asteroids error:', err);
        return res.status(500).json({ error: 'Server error' });
    }
};

exports.updateAsteroidController = async (req, res) => {
    try {
        const { id } = req.params;
        const updated = await updateAsteroid(id, req.body);
        if (!updated) {
            return res.status(404).json({ error: 'Asteroid not found' });
        }
        return res.status(200).json(updated);
    } catch (error) {
        console.error(`PUT /asteroids/${req.params.id} error:`, error);
        return res.status(500).json({ error: 'Server error' });
    }
};

exports.deleteAsteroidController = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await deleteAsteroid(id);
        
        if (!deleted) {
            return res.status(404).json({ error: 'Asteroid not found' });
        }
        
        return res.status(200).json({ message: 'Asteroid deleted' });
        
    } catch (error) {
        return res.status(500)
    }
};

