const mongoose = require("mongoose");
const Vote = require("../models/voteModel");

exports.castVote = async (req, res) => {
  try {
    const { itemId, itemType, voteType } = req.body;
    const userId = req.user._id; // from authMiddleware

    if (!["Thread", "Reply"].includes(itemType)) {
      return res.status(400).json({ message: "Invalid item type" });
    }
    if (!["up", "down"].includes(voteType)) {
      return res.status(400).json({ message: "Invalid vote type" });
    }

    const objectId = new mongoose.Types.ObjectId(itemId);

    // Update if exists, otherwise create
    const vote = await Vote.findOneAndUpdate(
      { userId, itemId: objectId, itemType },
      { voteType },
      { new: true, upsert: true }
    );

    res.status(200).json({ message: "Vote recorded", vote });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getVoteCount = async (req, res) => {
  try {
    const { itemId, itemType } = req.query;

    if (!["Thread", "Reply"].includes(itemType)) {
      return res.status(400).json({ message: "Invalid item type" });
    }

    const objectId = new mongoose.Types.ObjectId(itemId);

    const upVotes = await Vote.countDocuments({
      itemId: objectId,
      itemType,
      voteType: "up",
    });

    const downVotes = await Vote.countDocuments({
      itemId: objectId,
      itemType,
      voteType: "down",
    });

    res.json({ upVotes, downVotes, score: upVotes - downVotes });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
