import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";

// register new user(create)
export const registerController = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // validation
    if (!username || !email || !password) {
      return res.status(400).send({
        message: "Please fill all fields...",
        success: false,
      });
    }

    // existing user or not
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(401).send({
        message: "User already exist...",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // save new user
    const newUser = new userModel({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    return res.status(201).send({
      message: "New user created...",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Error in register...",
      success: false,
      error,
    });
  }
};

// login user
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // validation
    if (!email || !password) {
      return res.status(400).send({
        message: "Please fill all fields...",
        success: false,
      });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(200).send({
        message: "User with the email is not registered...",
        success: false,
      });
    }

    // check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({
        message: "Invalid password...",
        success: false,
      });
    }

    return res.status(200).send({
      message: "Login successful...",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Error in login...",
      success: false,
      error,
    });
  }
};

// get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find({});
    return res.status(200).send({
      userCount: users.length,
      message: "All users found...",
      success: true,
      users,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Error in getting all users...",
      success: false,
      error,
    });
  }
};
