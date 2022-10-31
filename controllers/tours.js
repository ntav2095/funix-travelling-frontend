const Tours = require("../models/tours");
const { validationResult } = require("express-validator");
exports.getTours = (req, res, next) => {
  Tours.find()
    .then((tours) => {
      if (!tours) {
        res.status(400).json("Chưa có tour nào trong cơ sở dữ liệu!");
      }
      return res.status(200).json(tours);
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ message: "Internal server error" });
    });
};

exports.getTourDetail = (req, res, next) => {
  const tourId = req.params.tourId;
  Tours.findById(tourId)
    .then((tour) => {
      if (!tour) {
        res.status(400).json("Tour này không tồn tại!");
      }
      return res.status(200).json(tour);
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ message: "Internal server error" });
    });
};

exports.createTour = (req, res, next) => {
  const {
    title,
    description,
    day,
    detail,
    price,
    image,
    location,
    regulations,
    timeOfTour,
  } = req.body;

  // validation
  const result = validationResult(req);
  const hasError = !result.isEmpty();
  if (hasError) {
    return res.status(400).json({ message: result.array()[0].msg });
  }

  //create newTour
  const newTour = new Tours({
    title,
    description,
    itinerary: {
      day,
      detail,
      location,
    },
    price,
    image,
    regulations,
    timeOfTour,
  });
  newTour
    .save()
    .then((tour) => {
      return res.status(200).json(tour);
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ message: "Internal server error" });
    });
};

exports.updateTour = (req, res, next) => {
  const tourId = req.params.tourId;
  const {
    title,
    description,
    day,
    detail,
    location,
    price,
    image,
    regulations,
    timeOfTour,
  } = req.body;

  // validation
  const result = validationResult(req);
  const hasError = !result.isEmpty();
  if (hasError) {
    return res.status(400).json({ message: result.array()[0].msg });
  }

  //update tour
  Tours.findById(tourId)
    .then((tour) => {
      if (!tour) {
        return res.status(400).json("Tour không tồn tại!");
      }
      tour.title = title;
      tour.description = description;
      tour.itinerary = { day, detail, location };
      tour.price = price;
      tour.image = image;
      tour.regulations = regulations;
      tour.timeOfTour = timeOfTour;
      tour
        .save()
        .then((tourUpdated) => {
          return res.status(200).json(tourUpdated);
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

exports.deleteTour = (req, res, next) => {
  const tourId = req.body.tourId;
  Tours.findByIdAndDelete(tourId)
    .then(() => {
      res.status(200).json({ message: "Tour đã được xóa!" });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ message: "Internal server error" });
    });
};
