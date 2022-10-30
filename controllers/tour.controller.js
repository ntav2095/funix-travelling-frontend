const mongoose = require("mongoose");
const { validationResult } = require("express-validator");
const BookTour = require("../models/bookTour");
const Tour = require("../models/tours");
const Review = require("../models/review");

module.exports.bookTour = async (req, res, next) => {
  try {
    // validation
    const result = validationResult(req);
    const hasError = !result.isEmpty();
    if (hasError) {
      return res.status(400).json({ message: result.array()[0].msg });
    }

    const {
      tourId,
      gender,
      name,
      email,
      phone,
      address,
      departureDay,
      adult,
      child,
    } = req.body;

    // check if tourId can cast to ObjectId
    if (!mongoose.Types.ObjectId.isValid(tourId)) {
      return res
        .status(400)
        .json({ message: "Can not cast tourId to ObjectId" });
    }

    // check if there is a tour with _id = tourId
    const tour = await Tour.findOne({ _id: tourId });
    if (!tour) {
      return res.status(400).json({ message: "Tour not found" });
    }

    const newTour = await BookTour.create({
      tourId,
      customerInfor: {
        gender,
        name,
        email,
        phone,
        address,
      },
      tourInformation: {
        departureDay,
        count: {
          adult,
          child,
        },
      },
    });

    return res
      .status(200)
      .json({ message: "Booked successfully", tour: newTour });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.addReview = async (req, res, next) => {
  try {
    // validation
    const result = validationResult(req);
    const hasError = !result.isEmpty();
    if (hasError) {
      return res.status(400).json({ message: result.array()[0].msg });
    }

    const { name, email, comment, rate, tourId } = req.body;

    // check if tourId can cast to ObjectId
    if (!mongoose.Types.ObjectId.isValid(tourId)) {
      return res
        .status(400)
        .json({ message: "Can not cast tourId to ObjectId" });
    }

    // check if there is a tour with _id = tourId
    const tour = await Tour.findOne({ _id: tourId });
    if (!tour) {
      return res.status(400).json({ message: "Tour not found" });
    }

    await Review.create({
      name,
      email,
      comment,
      rate,
      tourId,
    });

    return res.status(200).json({ message: "Sent successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
