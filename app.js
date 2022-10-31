const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

//router
const tourRouter = require("./router.js/tours");
const blogRouter = require("./router.js/blogs");

//model
const Tours = require("./models/tours");
const Blogs = require("./models/blogs");

//init data
const tourData = require("./data/tour");
const blogData = require("./data/blogs");

//database URI
const MONGO_URI =
  "mongodb+srv://travelWeb:travelWebsite123@cluster0.qfie8nj.mongodb.net/travel?retryWrites=true&w=majority";

//cors config
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

//config application
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//router
app.use("/tour", tourRouter);
app.use("/blog", blogRouter);

// port
const PORT = process.env.PORT || 5000;

//connect database and port
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    //create data for the first run
    Tours.findOne().then(async (tours) => {
      if (!tours) {
        await Tours.insertMany(tourData.tours);
      }
    });
    Blogs.findOne().then(async (blogs) => {
      if (!blogs) {
        await Blogs.insertMany(blogData.blogs);
      }
    });

    app.listen(PORT);
  })
  .catch((err) => console.log(err));
