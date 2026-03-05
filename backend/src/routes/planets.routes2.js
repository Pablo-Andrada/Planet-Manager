const { Router } = require("express");
const {
    getPlanetsController,
    createPlanetController,
    updatePlanetController,
    deletePlanetController
} = require("../controllers/planets.controller2");

const router = Router();

router.get("/", getPlanetsController);
router.post("/", createPlanetController);
router.put("/:id", updatePlanetController);
router.delete("/:id", deletePlanetController);

module.exports = router;