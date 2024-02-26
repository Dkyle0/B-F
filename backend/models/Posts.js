const mongoose = require("mongoose");
const validator = require("validator");
const ROLES = require("../constants/roles");

const PostSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
      validate: {
        validator: validator.isURL,
        massage: "Image should be a valid url",
      },
    },
    content: {
      type: String,
      dafault: ROLES.USER,
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
