const { body } = require("express-validator");

module.exports = [
  body("title").trim().notEmpty().withMessage("Tiêu đề không được bỏ trống!"),
  body("owner")
    .trim()
    .notEmpty()
    .withMessage("Chủ bài viết không được để trống!"),
  body("content")
    .trim()
    .notEmpty()
    .withMessage("Nội dung bài viết không được bỏ trống!"),
];
