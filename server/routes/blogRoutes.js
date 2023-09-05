const express = require("express");
const router = express.Router();
const {
  getUserBlog,
  addBlog,
  deleteBlog,
  getAllBlogs,
  likeBlog,
} = require("../controllers/blogController");

// Protecting the route and make sure that a user logged in with a token
const { protect } = require("../middleware/authMiddleware");

// Declaring API for controllers
router.route("/").get(protect, getUserBlog).post(protect, addBlog);
router.route("/delete/:id").delete(protect, deleteBlog);

// Getting allblogs for all users (none protected)
router.route("/all").get(getAllBlogs);

// Getting likes from users
router.route("/like/:id").put(protect, likeBlog);

module.exports = router;
