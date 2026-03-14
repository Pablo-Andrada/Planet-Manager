const { Router } = require("express");
const {
    getStarsController,
    createStarController,
    updateStarController,
    deleteStarController
}= require("../controllers/stars.controller")

const router = Router();

router.get("/", getStarsController);
router.post("/", createStarController);
router.put("/:id", updateStarController);
router.delete("/:id", deleteStarController);

module.exports = router;
