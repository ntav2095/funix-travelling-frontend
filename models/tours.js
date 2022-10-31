const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const Tours = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  itinerary: [
    {
      day: {
        type: Number,
      },
      location: {
        type: String,
      },
      detail: {
        type: String,
      },
    },
  ],
  price: {
    type: Number,
    required: true,
  },
  image: [],
  regulations: {
    type: String,
    required: true,
  },
  timeOfTour: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("tours", Tours);
