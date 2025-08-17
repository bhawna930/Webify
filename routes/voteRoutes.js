const express = require("express");
const { castVote, getVoteCount } = require("../controllers/voteController");
const { authMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, castVote);
router.get("/count", getVoteCount);

module.exports = router;
