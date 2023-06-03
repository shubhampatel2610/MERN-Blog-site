import React, { useState, useEffect } from "react";
import axios from "axios";
import BlogCard from "../components/blogCard";
import moment from "moment";

const Blogs = () => {
  const [blog, setBlog] = useState([]);

  // get all blogs
  const getAllBlogs = async () => {
    try {
      const { data } = await axios("/api/v1/blogs/all-blogs");
      if (data?.success) {
        setBlog(data?.blogs);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllBlogs();
  }, []);

  return (
    <div>
      {blog &&
        blog.map((b) => (
          <BlogCard
            title={b.title}
            description={b.description}
            username={b.user.username}
            time={moment(b.createdAt).fromNow()}
          />
        ))}
    </div>
  );
};

export default Blogs;
