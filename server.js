const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const colors = require("colors");
const dotenv = require("dotenv");

// env config
dotenv.config();

// REST object initialize
const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// home route - basic
app.get("/", (req, res) => {
  res.send("<h1>This is MERN blog site</h1>");
});

// listening server on port 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(
    ` Server is running on port ${PORT} on ${process.env.DEV_MODE} mode `
      .bgGreen.white
  );
});
