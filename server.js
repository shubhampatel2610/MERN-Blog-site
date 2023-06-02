import express from "express";
import cors from "cors";
import morgan from "morgan";
import colors from "colors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

// env config
dotenv.config();

// router import
import userRoutes from "./routes/userRoutes.js";

// mongoDB connection
connectDB();

// REST object initialize
const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// route
// app.get("/", (req, res) => {
//   res.send("<h1>This is MERN blog site</h1>");
// });
app.use("/api/v1/users", userRoutes);

// listening server on port 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(
    ` Server is running on port ${PORT} on ${process.env.DEV_MODE} mode `
      .bgGreen.white
  );
});
