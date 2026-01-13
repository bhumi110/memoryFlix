const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const progressController = require("../controllers/progress.controller");

const router = express.Router();

router.use(authMiddleware);

router.post("/", progressController.updateProgress);
router.get("/continue-watching", progressController.getContinueWatching);
router.delete("/:videoId", progressController.removeProgress);

module.exports = router;
