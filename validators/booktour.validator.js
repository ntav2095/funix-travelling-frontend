const { body } = require("express-validator");

const genders = ["mr", "mrs", "miss"];

module.exports = [
  body("tourId").trim().notEmpty().withMessage("Missing tourId"),
  body("gender")
    .trim()
    .notEmpty()
    .withMessage("Missing gender")
    .custom((value) => {
      if (!genders.includes(value)) {
        throw new Error("Invalid gender");
      }
      return true;
    }),
  body("name").trim().notEmpty().withMessage("Missing name"),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Misisng email")
    .isEmail()
    .withMessage("Invalid email address"),
  body("phone")
    .trim()
    .notEmpty()
    .withMessage("Missing phone number")
    .isMobilePhone()
    .withMessage("Invalid phone number"),
  body("address").trim().notEmpty().withMessage("Missing address"),
  body("departureDay")
    .trim()
    .notEmpty()
    .withMessage("Missing address")
    .isDate()
    .withMessage("Invalid date"),
  body("adult")
    .trim()
    .notEmpty()
    .withMessage("Missing adult")
    .isInt()
    .withMessage("Invalid adult"),
  body("child")
    .trim()
    .notEmpty()
    .withMessage("Missing adult")
    .isInt()
    .withMessage("Invalid adult"),
];
