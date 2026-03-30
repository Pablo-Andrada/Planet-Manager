const {
    getAllMoonsService,
    createMoonService,
    updateMoonService,
    deleteMoonService
} = require("../services/moon.service");
 

const getAllMoonsController = async (req, res) => {
    try {
        const moons = await getAllMoonsController();

        return res.status(200).json(moons)
    } catch (err) {
        
        res.status(500).json({ err: "Server error" })
    }
};

const createMoonController = async (req, res) => {
    try {
        const { name, diameter, hasLife } = req.body;
        if (!name || diameter === undefined) {
            return res.status(400).json({ error: "Name o diameter invalid" })
        }
        const newMoon = await createMoonService({ name, diameter, hasLife });
        return res.status(201).json(newMoon);
    } catch (err) {
        return res.status(404).json({ err: "Server error." });
    }
};

const updateMoonController = async (req,res) => {
    try {
        const { id } = req.params;
        const updated = await updateMoonService(id, req.body);

        if(!updated) return res.status(404).json({error:"Moon not found"})
        
        return res.status(200).json(updated);
    } catch (err) {
        return res.status(500).json({err:"Server error"});
    }
}

const deleteMoonController = async (req,res) => {
    try {
        const { id } = req.params;
        const deleted = await deleteMoonService(id);

        if(!deleted) return res.status(400).json({error: "Moon not found"})
        
        return res.status(200).json({message:"Moon deleted"})

    } catch (err) {
        return res.status(500).json({err:"Server error."})
    }
}