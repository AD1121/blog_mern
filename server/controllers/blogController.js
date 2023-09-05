const asyncHandler = require("express-async-handler"); // for clearer and more sure error handler

const Blog = require("../models/blogModel"); // Reading from the model on MongoDB
const User = require("../models/userModel");

// @desc    Get All blogs
// @route   GET /api/blogs/all
// @access  Public
const getAllBlogs = asyncHandler(async (req, res) => {
  const blogs = await Blog.find().sort({ createdAt: -1 }); // asorting the latest blog to top by date

  res.status(200).json(blogs);
});

// @desc    Get blog
// @route   GET /api/blogs
// @access  Private
const getUserBlog = asyncHandler(async (req, res) => {
  const blogs = await Blog.find({ user: req.user.id }).sort({ createdAt: -1 }); // asorting the latest blog to top by date

  res.status(200).json(blogs);
});

// @desc    Add Blog
// @route   POST /api/blogs
// @access  Private
const addBlog = asyncHandler(async (req, res) => {
  // Making sure both fields filled from front end
  if (!req.body.title && !req.body.content) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  // Addign the blog in the MongoDB
  const blog = await Blog.create({
    title: req.body.title,
    content: req.body.content,
    user: req.user.id,
    blogger: req.user.name,
  });

  res.status(200).json(blog);
});

// @desc    Delete blog
// @route   DELETE /api/delete/:id
// @access  Private
const deleteBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  // Checking for blog to exist
  if (!blog) {
    res.status(400);
    throw new Error("Blog not found");
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Make sure the logged in user matches the same blog
  if (blog.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  // Deleteing the blog
  await blog.deleteOne();

  res.status(200).json({ id: req.params.id });
});

// // @route    PUT api/posts/like/:id
// // @desc     Like a post
// // @access   Private
const likeBlog = asyncHandler(async (req, res) => {
  try {
    // Finding the blog by its _id
    const blog = await Blog.findById(req.params.id);

    // Check if the post has already been liked
    if (blog.likes.some((like) => like.user.toString() === req.user.id)) {
      return res.status(400).json({ msg: "Post already liked" });
    }

    blog.likes.unshift({ user: req.user.id });

    await blog.save();

    return res.json(blog.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = {
  getAllBlogs,
  addBlog,
  deleteBlog,
  getUserBlog,
  likeBlog,
}; // passing the functions to router on backend
