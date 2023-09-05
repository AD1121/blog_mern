const express = require("express");
const router = express.Router();
const {
  getBlog,
  addBlog,
  deleteBlog,
  getAllBlogs,
  updateBlog,
} = require("../controllers/blogController");

// Protecting the route and make sure that a user logged in with a token
const { protect } = require("../middleware/authMiddleware");

// Declaring API for controllers
router.route("/").get(protect, getBlog).post(protect, addBlog);
router.route("/delete/:id").delete(deleteBlog).put(protect, updateBlog);

// Getting allblogs for all users (none protected)
router.route("/all").get(protect, getAllBlogs);

module.exports = router;
