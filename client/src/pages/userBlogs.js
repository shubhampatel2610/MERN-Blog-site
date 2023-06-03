import React, { useEffect, useState } from "react";
import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserBlogs = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    const savedData = sessionStorage.getItem("blogData");
    if (savedData) {
      setInput(JSON.parse(savedData));
    }
  }, []);

  useEffect(() => {
    const handleBeforeUnload = () => {
      sessionStorage.setItem("blogData", JSON.stringify(input));
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [input]);

  // submit form control function
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post("/api/v1/blogs/create-blog", {
        title: input.title,
        description: input.description,
        user: "6479b4714a0d00272bb1ec2a",
      });
      if (data?.success) {
        alert("New blog created...");
        setInput({ title: "", description: "" });
        navigate("/all-blogs");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // handle change function
  const handleChange = (event) => {
    setInput((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Box
          border={1}
          borderRadius={10}
          padding={3}
          margin={"auto"}
          boxShadow={"1px 1px 10px grey"}
          display={"flex"}
          flexDirection={"column"}
          width={"60%"}
          marginTop={"40px"}
          alignContent={"center"}
        >
          <Typography
            variant="h2"
            textAlign={"center"}
            padding={3}
            color={"grey"}
          >
            Create new blog
          </Typography>
          <InputLabel
            sx={{
              marginBottom: 1,
              marginTop: 2,
              fontSize: "20px",
              fontWeight: "bold",
            }}
          >
            Title:
          </InputLabel>
          <TextField
            name="title"
            value={input.title}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            required
          />
          <InputLabel
            sx={{
              marginBottom: 1,
              marginTop: 2,
              fontSize: "20px",
              fontWeight: "bold",
            }}
          >
            Description:
          </InputLabel>
          <TextField
            name="description"
            value={input.description}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            required
          />
          <Button
            sx={{
              marginTop: 3,
              marginBottom: 3,
              maxWidth: "50%",
              marginLeft: "25%",
            }}
            type="submit"
            color="primary"
            variant="contained"
          >
            CREATE
          </Button>
        </Box>
      </form>
    </>
  );
};

export default UserBlogs;
