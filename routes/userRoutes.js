import express from "express";
import {
  getAllUsers,
  loginController,
  registerController,
} from "../controllers/userController.js";

// router object from express
const router = express.Router();

// get all users - GET
router.get("/all-users", getAllUsers);

// create user - POST
router.post("/register", registerController);

// login user - POST
router.post("/login", loginController);

export default router;
