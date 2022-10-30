const { body } = require("express-validator");

module.exports = [
  body("tourId").trim().notEmpty().withMessage("Missing tourId"),
  body("name").trim().notEmpty().withMessage("Missing name"),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Misisng email address")
    .isEmail()
    .withMessage("Invalid email address"),
  body("rate")
    .trim()
    .notEmpty()
    .withMessage("Missing rating")
    .isInt()
    .withMessage("Rating must be a number (1 - 5)")
    .custom((value) => {
      if (value > 5 || value < 1) {
        throw new Error("Rating must be a number (1 - 5)");
      }
      return true;
    }),
];
