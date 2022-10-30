require("dotenv").config();
const express = require("express");

// init
const app = express();

// middlewares
app.use(require("./middlewares/cors.middleware"));
app.use(require("body-parser").json());

// routes
app.use("/api/tour", require("./routes/tour.route"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(
    `Server is running on port ${PORT} in ${process.env.NODE_ENV} environment`
  );
});
