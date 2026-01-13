const mongoose = require("mongoose");

const watchProgressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },
    videoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Video",
      required: true,
      index: true
    },
    progress: {
      type: Number,
      required: true,
      default: 0
    },
    duration: {
      type: Number,
      required: true
    },
    completed: {
      type: Boolean,
      default: false
    },

    lastWatchedAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);


watchProgressSchema.index(
  { userId: 1, videoId: 1 },
  { unique: true }
);

module.exports = mongoose.model("WatchProgress", watchProgressSchema);
