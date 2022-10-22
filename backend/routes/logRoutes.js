const express = require("express");
const router = express.Router();

const {
  getLogs,
  createLog,
  updateLog,
  deleteLog,
} = require("../controllers/logController");

// Auth middleware to protect the routes
const { protect } = require("../middleware/authmiddleware");

router.get("/", protect, getLogs);
router.post("/", protect, createLog);
router.put("/:id", protect, updateLog);
router.delete("/:id", protect, deleteLog);

module.exports = router;
