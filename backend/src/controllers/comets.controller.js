const { 
    getAllCometsService,
    createCometService,
    updateCometService,
    deleteCometService
} = require("../services/comet.service");

exports.getCometsController = async (req,res) => {
    try {
        const comets = await getAllCometsService();
        return res.status(200).json(comets);
        
    } catch (err) {
        console.error("GET/comets error",err);
        return res.status(500).json({error:"Server error"});
    }
}
exports.createCometController = async (req,res) => {
    try {
        const { name, diameter, hasLife } = req.body;
        // Validaciones simples
    if (!name || diameter === undefined) {
      return res.status(400).json({ error: 'Name and diameter are required' });
    }
        const newComet = await createComet({ name, diameter, hasLife });
        return res.status(201).json(newComet);
    } catch (err) {
        console.error("POST/comets error",err);
        return res.status(500).json({error:"Server error"});
    }
}
exports.updateCometController = async (req,res) => {
    try {
        const { id } = req.params;
        const updated = await updateComet(id, req.body);

        if (!updated) {
            return res.status(404).json({ error: 'Comet not found' });
        };

        return res.status(200).json(updated);      
        
    } catch (err) {
        console.error(`PUT /comets/${req.params.id} error:`, err);
    return res.status(500).json({ error: 'Server error' });
    }
}
exports.deleteCometController = async (req,res) => {
    try {
        const { id } = req.params;
        const deleted = await deleteCometService(id);

        if (!deleted) {
      return res.status(404).json({ error: 'Planet not found' });
        }
        return res.status(200).json({message:"Planet deleted"})
        
    } catch (err) {
        console.error(`DELETE /planets/${req.params.id} error:`, err);
        return res.status(500).json({error:"Server error"});
    }
}