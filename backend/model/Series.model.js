const mongoose =require("mongoose");

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

seriesSchema.index({ userId: 1, createdAt: -1 });
seriesSchema.index({ title: "text", description: "text" });

module.exports=mongoose.model("Series", seriesSchema);
