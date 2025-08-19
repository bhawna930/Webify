const Thread = require("../models/Thread");

exports.searchThreads = async (req, res) => {
  try {
    const { query } = req.query; // e.g. /search?query=hello

    if (!query || query.trim() === "") {
      return res.status(400).json({ message: "Search query is required" });
    }

    const threads = await Thread.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { content: { $regex: query, $options: "i" } },
        { createdBy: { $regex: query, $options: "i" } }
      ]
    }).sort({ createdAt: -1 });

    res.json(threads);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
