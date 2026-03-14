const {
    getAllStars,
    createStar,
    updateStar,
    deleteStar
} = require("../services/star.service");

exports.getStarsController = async (req, res) => {
    
    try {
        const stars = await getAllStars();
        return req.status(200).json(stars);
    } catch (error) {
        console.error('GET /stars error:', error);
        return res.status(500).json({ error: 'Server error' });
    }
};

exports.createStarController = async (req,res) => {
    try {
         const { name, diameter, hasLife } = req.body;

    // Validaciones simples
    if (!name || diameter === undefined) {
      return res.status(400).json({ error: 'Name and diameter are required' });
    }
        const newStar = await createStar({ name, diameter, hasLife });
    return res.status(201).json(newStar);
    } catch (error) {
        console.error('POST /stars error:', err);
    return res.status(500).json({ error: 'Server error' });
    }
}