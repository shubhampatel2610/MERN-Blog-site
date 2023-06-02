import mongoose from "mongoose";
import blogModel from "../models/blogModel.js";
import userModel from "../models/userModel.js";

// get all blogs
export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await blogModel.find({});
    if (!blogs) {
      return res.status(200).send({
        message: "No blogs found...",
        success: false,
      });
    }
    return res.status(200).send({
      blogCount: blogs.length,
      message: "All blogs found...",
      success: true,
      blogs,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Error in getting all blogs...",
      success: false,
      error,
    });
  }
};

// create blogs
export const createBlogController = async (req, res) => {
  try {
    const { title, description, user } = req.body;

    //validation
    if (!title || !description || !user) {
      return res.status(400).send({
        message: "Please fill all fields...",
        success: false,
      });
    }

    const existingUser = await userModel.findById(user);
    if (!existingUser) {
      return res.status(404).send({
        message: "User does not exist...",
        success: false,
      });
    }

    const newBlog = new blogModel({ title, description, user });

    const session = await mongoose.startSession();
    session.startTransaction();
    await newBlog.save({ session });
    existingUser.blogs.push(newBlog);
    await existingUser.save({ session });
    await session.commitTransaction();

    await newBlog.save();
    return res.status(201).send({
      message: "New blog created...",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Error in create blog...",
      success: false,
      error,
    });
  }
};

// update blogs
export const updateBlogController = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const blog = await blogModel.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );
    return res.status(200).send({
      message: "Blog updated successfully...",
      success: true,
      blog,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Error in update blog...",
      success: false,
      error,
    });
  }
};

// delete blogs
export const deleteBlogController = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await blogModel.findOneAndDelete(id).populate("user");
    await blog.user.blogs.pull(blog);
    await blog.user.save();
    return res.status(200).send({
      message: "Blog deleted successfully...",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Error in delete blog...",
      success: false,
      error,
    });
  }
};

// get single blog
export const getBlogController = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await blogModel.findById(id);
    if (!blog) {
      return res.status(404).send({
        message: "Blog not found...",
        success: false,
      });
    }
    return res.status(200).send({
      message: "Single blog found...",
      status: true,
      blog,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Error in getting single blog...",
      success: false,
      error,
    });
  }
};

// get user blog
export const userBlogController = async (req, res) => {
  try {
    const { id } = req.params;
    const userBlogs = await userModel.findById(id).populate("blogs");
    if (!userBlogs) {
      res.status(404).send({
        message: "Blogs not found for this user...",
        success: false,
      });
    }
    return res.status(200).send({
      message: "Blogs found for this user...",
      success: true,
      userBlogs,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Error in getting user blog...",
      success: false,
      error,
    });
  }
};
