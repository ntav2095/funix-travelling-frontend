const express = require("express");
const router = express.Router();
// blog controller
const blogController = require("../controllers/blogs");

// blog validator
const blogValidator = require("../validators/blogs.validator");

router.get("/", blogController.getBlogs);
router.get("/:blogId", blogController.getBlogDetail);
router.post("/create", blogValidator, blogController.createBlog);
router.post("/update/:blogId", blogValidator, blogController.updateBlog);
router.post("/delete", blogController.deleteBlog);

module.exports = router;
