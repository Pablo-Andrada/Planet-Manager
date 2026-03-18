const {
    getAllStars,
    createStar,
    updateStar,
    deleteStar
} = require("../services/star.service");

exports.getStarsController = async (req, res) => {
    
    try {
        const stars = await getAllStars();
        return res.status(200).json(stars);
    } catch (error) {
        console.error('GET /stars error:', error);
        return res.status(500).json({ error: 'Server error' });
    }
};

exports.createStarController = async (req, res) => {
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
};
exports.updateStarController = async (req, res) => {
    try {
        const {id} = req.params;
        const updated = await updateStar(id, req.body);
        if (!updated) {
            return res.status(404).json({ error: 'Star not found' });
        }

        return res.status(200).json(updated);
    } catch (error) {
        console.error(`PUT /stars/${req.params.id} error:`, error);
        return res.status(500).json({ error: 'Server error' });
    }
};

exports.deleteStarController = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await deleteStar(id);

    if (!deleted) {
      return res.status(404).json({ error: 'Star not found' });
    }

    return res.status(200).json({ message: 'Star deleted' });
  } catch (err) {
    console.error(`DELETE /stars/${req.params.id} error:`, err);
    return res.status(500).json({ error: 'Server error' });
  }
};

