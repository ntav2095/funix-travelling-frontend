const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const BookTour = new Schema({
  tourId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "tours",
  },
  customerInfor: {
    gender: {
      // mr | mrs | miss
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
  },
  tourInformation: {
    departureDay: {
      type: Date,
      required: true,
    },
    count: {
      adult: {
        type: Number,
        required: true,
      },
      child: {
        type: Number,
        required: true,
      },
    },
  },
});

module.exports = mongoose.model("bookTour", BookTour);
