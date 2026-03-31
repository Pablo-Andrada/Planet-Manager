const { Router } = require("express");
const { 
    getAllMoonsController,
    createMoonController,
    updateMoonController,
    deleteMoonController
} = require("../controllers/moons.controller");

const router = Router();

router.get("/", getAllMoonsController);
router.post("/", createMoonController);
router.put("/:id", updateMoonController);
router.delete("/:id", deleteMoonController);

module.exports = router;