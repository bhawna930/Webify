const mongoose = require("mongoose");

const voteSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    itemId: { type: mongoose.Schema.Types.ObjectId, required: true },
    itemType: { type: String, enum: ["Thread", "Reply"], required: true },
    voteType: { type: String, enum: ["up", "down"], required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Vote", voteSchema);
