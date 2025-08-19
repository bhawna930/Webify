const express = require("express");
const router = express.Router();
const searchController = require("../controllers/searchController");

// ✅ Search threads
router.get("/", searchController.searchThreads);

module.exports = router;
