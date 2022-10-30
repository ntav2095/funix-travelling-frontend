const express = require("express");
const router = express.Router();

// controllers
const tourController = require("../controllers/tour.controller");

// validators
const bookTourValidator = require("../validators/booktour.validator");

// routes
router.post("/book", bookTourValidator, tourController.bookTour);

module.exports = router;
