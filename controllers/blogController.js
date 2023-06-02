import blogModel from "../models/blogModel.js";

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
    const { title, description } = req.body;

    //validation
    if (!title || !description) {
      return res.status(400).send({
        message: "Please fill all fields...",
        success: false,
      });
    }

    const newBlog = new blogModel({ title, description });
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
    await blogModel.findByIdAndDelete(id);
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
