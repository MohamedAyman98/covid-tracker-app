const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  editName,
} = require("../controllers/userController");

const { protect } = require("../middleware/authmiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.put("/editName", protect, editName);

module.exports = router;
