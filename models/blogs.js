const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const Blogs = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    owner: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    image: [],
  },
  { timestamps: true }
);

module.exports = mongoose.model("blogs", Blogs);
