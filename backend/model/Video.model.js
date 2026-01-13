const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },

    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120
    },

    description: {
      type: String,
      trim: true,
      maxlength: 1000
    },

    videoUrl: {
      type: String,
      required: true
    },

    thumbnailUrl: {
      type: String,
      default: ""
    },

    duration: {
      type: Number
    },

    mood: {
      type: String,
      enum: ["calm", "happy", "sad", "healing", "confused", "hopeful"],
      default: "calm"
    },

    seriesId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Series",
      default: null
    },

    seasonNumber: {
      type: Number,
      default: 1
    },

    episodeNumber: {
      type: Number
    },

    recordedAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);


videoSchema.index({ userId: 1, createdAt: -1 });
videoSchema.index({ title: "text", description: "text" });

module.exports = mongoose.model("Video", videoSchema);
