const Series = require("../model/Series.model");
const Video = require("../model/Video.model");


//---------------------create series---------------------------
exports.createSeries = async (req, res) => {
  try {
    const { title, description, coverImage } = req.body;

    const series = await Series.create({
      userId: req.user._id,
      title,
      description,
      coverImage
    });

    res.status(201).json(series);
  } catch (err) {
    res.status(500).json({ message: "Failed to create series" });
  }
};


//---------------------------all series------------------
exports.getSeries = async (req, res) => {
  try {
    const series = await Series.find({
      userId: req.user._id
    }).sort({ createdAt: -1 });

    res.json(series);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch series" });
  }
};


//---------------------get series----------------------------
exports.getSeriesById = async (req, res) => {
  try {
    const series = await Series.findOne({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!series) {
      return res.status(404).json({ message: "Series not found" });
    }

    const videos = await Video.find({
      userId: req.user._id,
      seriesId: series._id,
      isArchived: false
    }).sort({ seasonNumber: 1, episodeNumber: 1 });

    res.json({ series, videos });
  } catch (err) {
    res.status(400).json({ message: "Invalid series id" });
  }
};


//----------------------update----------------------------------
exports.updateSeries = async (req, res) => {
  try {
    const series = await Series.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      req.body,
      { new: true }
    );

    if (!series) {
      return res.status(404).json({ message: "Series not found" });
    }

    res.json(series);
  } catch (err) {
    res.status(400).json({ message: "Update failed" });
  }
};


//--------------delete---------------------------------------
exports.deleteSeries = async (req, res) => {
  try {
    const series = await Series.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!series) {
      return res.status(404).json({ message: "Series not found" });
    }

    // Detach videos (do NOT delete them)
    await Video.updateMany(
      { seriesId: series._id },
      { $set: { seriesId: null } }
    );

    res.json({ message: "Series deleted" });
  } catch (err) {
    res.status(400).json({ message: "Delete failed" });
  }
};

//----------------series cover----------------------------------------
exports.uploadCoverImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Cover image is required" });
    }

    const series = await Series.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      { coverImage: `/uploads/series/${req.file.filename}` },
      { new: true }
    );

    if (!series) {
      return res.status(404).json({ message: "Series not found" });
    }

    res.json({ message: "Cover uploaded", series });
  } catch (err) {
    res.status(500).json({ message: "Cover upload failed" });
  }
};