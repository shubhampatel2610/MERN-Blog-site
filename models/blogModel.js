import mongoose from "mongoose";

const blogSchema = mongoose.Schema(
  {
    title: {
      type: String,
      require: [true, "Title is required..."],
    },
    description: {
      type: String,
      require: [true, "Description is required..."],
    },
  },
  { timestamps: true }
);

const blogModel = mongoose.model("blog", blogSchema);

export default blogModel;
