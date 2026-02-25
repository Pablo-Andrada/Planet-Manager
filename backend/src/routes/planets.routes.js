const { Router } = require ("express");

const {
    getPlanets,
    createPlanet,
    updatePlanet,
    deletePlanet
} = require("../controllers/planets.controller");

const router = Router();

router.get("/", getPlanets);
router.post("/", createPlanet);
router.put("/:id", updatePlanet);
router.delete("/:id", deletePlanet);

module.exports = router;