const Video = require("../model/Video.model");


//-----------------upload------------------------------------
exports.uploadVideo = async (req, res) => {
  try {
    if (!req.files || !req.files.video) {
      return res.status(400).json({ message: "Video file is required" });
    }

    const videoFile = req.files.video[0];
    const thumbnailFile = req.files.thumbnail
      ? req.files.thumbnail[0]
      : null;

    const video = await Video.create({
      userId: req.user._id,
      title: req.body.title,
      description: req.body.description,
      mood: req.body.mood,
      seriesId: req.body.seriesId || null,
      seasonNumber: req.body.seasonNumber,
      episodeNumber: req.body.episodeNumber,
      recordedAt: req.body.recordedAt,
      videoUrl: `/uploads/videos/${videoFile.filename}`,
      thumbnailUrl: thumbnailFile
        ? `/uploads/thumbnails/${thumbnailFile.filename}`
        : ""
    });

    res.status(201).json({ message: "Video uploaded", video });
  } catch (err) {
    res.status(500).json({ message: "Upload failed" });
  }
};


//-------homepage videos---------------------------------------
exports.getVideos = async (req, res) => {
  try {
    const { page = 1, limit = 20, mood, seriesId } = req.query;

    const filter = {
      userId: req.user._id,
      isArchived: false
    };

    if (mood) filter.mood = mood;
    if (seriesId) filter.seriesId = seriesId;

    const videos = await Video.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.json(videos);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch videos" });
  }
};

//-----------------video play page---------------------------------------
exports.getVideoById = async (req, res) => {
  try {
    const video = await Video.findOne({
      _id: req.params.id,
      userId: req.user._id,
      isArchived: false
    });

    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    res.json(video);
  } catch (err) {
    res.status(400).json({ message: "Invalid video id" });
  }
};


//-----------------search video-----------------------------------
exports.searchVideos = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q) {
      return res.json([]);
    }

    const results = await Video.find(
      {
        userId: req.user._id,
        isArchived: false,
        $text: { $search: q }
      },
      { score: { $meta: "textScore" } }
    ).sort({ score: { $meta: "textScore" } });

    res.json(results);
  } catch (err) {
    res.status(500).json({ message: "Search failed" });
  }
};


//-------------series video------------------------------------------------------
exports.getSeriesVideos = async (req, res) => {
  try {
    const videos = await Video.find({
      userId: req.user._id,
      seriesId: req.params.seriesId,
      isArchived: false
    }).sort({ seasonNumber: 1, episodeNumber: 1 });

    res.json(videos);
  } catch (err) {
    res.status(500).json({ message: "Failed to load series" });
  }
};


//--------------------update video-----------------------------------------
exports.updateVideo = async (req, res) => {
  try {
    const video = await Video.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      req.body,
      { new: true }
    );

    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    res.json(video);
  } catch (err) {
    res.status(400).json({ message: "Update failed" });
  }
};


//------------------------delete videos-----------------------------------------
exports.deleteVideo = async (req, res) => {
  try {
    const video = await Video.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      { isArchived: true },
      { new: true }
    );

    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    res.json({ message: "Video archived" });
  } catch (err) {
    res.status(400).json({ message: "Delete failed" });
  }
};
