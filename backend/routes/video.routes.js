const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const {upload}=require("../middleware/upload.middleware");
const videoController = require("../controllers/video.controller");

const router = express.Router();

router.use(authMiddleware);

router.post("/upload", upload.fields([
    { name: "video", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 }
  ]), videoController.uploadVideo);

router.get("/", videoController.getVideos);
router.get("/search", videoController.searchVideos);
router.get("/series/:seriesId", videoController.getSeriesVideos);
router.get("/:id", videoController.getVideoById);
router.put("/:id", videoController.updateVideo);
router.delete("/:id", videoController.deleteVideo);

module.exports = router;
