const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const seriesController = require("../controllers/series.controller");
const {uploadCover}=require("../middleware/upload.middleware");

const router = express.Router();

router.use(authMiddleware);

router.post("/:id/cover", uploadCover.single("cover"), seriesController.uploadCoverImage);

router.post("/create", seriesController.createSeries);
router.get("/all", seriesController.getSeries);
router.get("/:id", seriesController.getSeriesById);
router.put("/update/:id", seriesController.updateSeries);
router.delete("/delete/:id", seriesController.deleteSeries);

module.exports = router;
