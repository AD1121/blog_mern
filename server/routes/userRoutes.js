const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  getMe,
} = require("../controllers/useController");
const { protect } = require("../middleware/authMiddleware"); // Making sure the auth is private

// Declaring API for controllers
router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getMe);

module.exports = router;
