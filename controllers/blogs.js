const Blogs = require("../models/blogs");
const { validationResult } = require("express-validator");

exports.getBlogs = (req, res, next) => {
  Blogs.find()
    .then((blogs) => {
      if (!blogs) {
        res.status(400).json("Chưa có bài viết nào trong cơ sở dữ liệu!");
      }
      return res.status(200).json(blogs);
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ message: "Internal server error" });
    });
};

exports.getBlogDetail = (req, res, next) => {
  const blogId = req.params.blogId;
  Blogs.findById(blogId)
    .then((blog) => {
      if (!blog) {
        res.status(400).json("Bài viết này không tồn tại!");
      }
      return res.status(200).json(blog);
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ message: "Internal server error" });
    });
};

exports.createBlog = (req, res, next) => {
  const { title, owner, content, image } = req.body;

  // validation
  const result = validationResult(req);
  const hasError = !result.isEmpty();
  if (hasError) {
    return res.status(400).json({ message: result.array()[0].msg });
  }

  //create newBlog
  const newBlog = new Blogs({
    title,
    owner,
    content,
    image,
  });
  newBlog
    .save()
    .then((blog) => {
      return res.status(200).json(blog);
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ message: "Internal server error" });
    });
};

exports.updateBlog = (req, res, next) => {
  const blogId = req.params.blogId;
  const { title, owner, content, image } = req.body;

  // validation
  const result = validationResult(req);
  const hasError = !result.isEmpty();
  if (hasError) {
    return res.status(400).json({ message: result.array()[0].msg });
  }

  //update blog
  Blogs.findById(blogId)
    .then((blog) => {
      if (!blog) {
        return res.status(400).json("Bài viết không tồn tại!");
      }
      blog.title = title;
      blog.owner = owner;
      blog.content = content;
      blog.image = image;
      blog
        .save()
        .then((blogUpdated) => {
          return res.status(200).json(blogUpdated);
        })
        .catch((err) => {
          console.log(err);
          return res.status(500).json({ message: "Internal server error" });
        });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ message: "Internal server error" });
    });
};

exports.deleteBlog = (req, res, next) => {
  const blogId = req.body.blogId;
  Blogs.findByIdAndDelete(blogId)
    .then(() => {
      res.status(200).json({ message: "Bài viết đã được xóa!" });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ message: "Internal server error" });
    });
};
