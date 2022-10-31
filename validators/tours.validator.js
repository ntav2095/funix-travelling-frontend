const { body } = require("express-validator");

module.exports = [
  body("title").trim().notEmpty().withMessage("Tiêu đề không được bỏ trống!"),
  body("description")
    .trim()
    .notEmpty()
    .withMessage("Mô tả không được để trống!"),
  body("price").trim().notEmpty().withMessage("Giá tour không được bỏ trống!"),
  body("regulations")
    .trim()
    .notEmpty()
    .withMessage("Quy định tour không được để trống!"),
  body("timeOfTour")
    .trim()
    .notEmpty()
    .withMessage("Thởi gian tour không được để trống!"),
];
