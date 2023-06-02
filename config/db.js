import mongoose from "mongoose";
import colors from "colors";

const connectDB = async () => {
  try {
    // connection to mongoDB cluster
    await mongoose.connect(process.env.MONGODB_URL);
    console.log(" Connection is successful to mongoDB ".bgBlue.white);
  } catch (error) {
    console.log(" MongoDB connection error ".bgRed.white);
  }
};

export default connectDB;
