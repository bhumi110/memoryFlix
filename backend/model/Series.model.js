import mongoose from "mongoose";

const seriesSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index:true
    },

    title: {
      type: String,
      required: true
    },

    description: {
      type: String
    },

    coverImage: {
      type: String,
      default: ""
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("Series", seriesSchema);
