const mongoose = require("mongoose");

// Blog schema mongoDB
const blogSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId, // getting the specific user id
      required: true,
      ref: "User", // getting the user id from User schema
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    // Username
    blogger: {
      type: String,
      required: true,
    },
    likes: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Blog", blogSchema);
