import express from "express";
import {
  getAllBlogs,
  createBlogController,
  updateBlogController,
  deleteBlogController,
  getBlogController,
  userBlogController,
} from "../controllers/blogController.js";

// router object from express
const router = express.Router();

// get all blogs - GET
router.get("/all-blogs", getAllBlogs);

// create blog - POST
router.post("/create-blog", createBlogController);

// update blog - PUT
router.put("/update-blog/:id", updateBlogController);

// delete blog - DELETE
router.delete("/delete-blog/:id", deleteBlogController);

// blog detail - GET
router.get("/get-blog/:id", getBlogController);

// user blog - GET
router.get("/user-blog/:id", userBlogController);

export default router;
