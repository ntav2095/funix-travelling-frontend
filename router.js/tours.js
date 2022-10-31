const express = require("express");
const router = express.Router();
// tour controller
const tourController = require("../controllers/tours");

// tour validator
const tourValidator = require("../validators/tours.validator");

router.get("/", tourController.getTours);
router.get("/:tourId", tourController.getTourDetail);
router.post("/create", tourValidator, tourController.createTour);
router.post("/update/:tourId", tourValidator, tourController.updateTour);
router.post("/delete", tourController.deleteTour);

module.exports = router;
