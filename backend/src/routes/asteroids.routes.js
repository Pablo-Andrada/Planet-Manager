const { Router } = require("express");

const {
    getAsteroidsController,
    createAsteroidController,
    updateAsteroidController,
    deleteAsteroidController
} = require("../controllers/asteroids.controller");

const router = Router();

router.get("./", getAsteroidsController);
router.post("./", createAsteroidController);
router.put("./:id", updateAsteroidController);
router.delete("./:id", deleteAsteroidController);

module.exports = router;