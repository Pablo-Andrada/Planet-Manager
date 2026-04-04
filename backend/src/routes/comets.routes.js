const { Router } = require("express");

const {
    getCometsController,
    createCometController,
    updateCometController,
    deleteCometController
} = require("../controllers/comets.controller");

const router = Router();

router.get("/", getCometsController);
router.post("/", createCometController);
router.put("/:id", updateCometController);
router.delete("/:id", deleteCometController);

module.exports = router;