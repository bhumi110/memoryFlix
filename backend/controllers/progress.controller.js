const WatchProgress = require("../model/watchProgress.model");


//-----------------update progress------------------------------------
exports.updateProgress = async (req, res) => {
  try {
    const { videoId, progress, duration } = req.body;

    const completed = progress >= duration * 0.95;

    const watchProgress = await WatchProgress.findOneAndUpdate(
      {
        userId: req.user._id,
        videoId
      },
      {
        progress,
        duration,
        completed,
        lastWatchedAt: new Date()
      },
      {
        new: true,
        upsert: true
      }
    );

    res.json(watchProgress);
  } catch (err) {
    res.status(500).json({ message: "Failed to update progress" });
  }
};


//-----------------homepage continue watchlist row------------------------------------
exports.getContinueWatching = async (req, res) => {
  try {
    const items = await WatchProgress.find({
      userId: req.user._id,
      completed: false
    })
      .populate("videoId")
      .sort({ lastWatchedAt: -1 })
      .limit(10);

    res.json(items);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch continue watching" });
  }
};


//-------------remove from continue watchlist--------------------------
exports.removeProgress = async (req, res) => {
  try {
    await WatchProgress.deleteOne({
      userId: req.user._id,
      videoId: req.params.videoId
    });

    res.json({ message: "Removed from continue watching" });
  } catch (err) {
    res.status(400).json({ message: "Failed to remove progress" });
  }
};
