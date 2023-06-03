import React, { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../redux/store";

const Signin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // state
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  // handle input change
  const handleChange = (event) => {
    setInput((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  // handle form submit
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await axios.post("/api/v1/users/login", {
        email: input.email,
        password: input.password,
      });

      if (data.success) {
        dispatch(authActions.login());
        alert("User login successfully...");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Box
          maxWidth={450}
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          justifyContent={"center"}
          margin={"auto"}
          marginTop={5}
          boxShadow={"1px 1px 10px grey"}
          padding={3}
          borderRadius={5}
        >
          <Typography
            variant="h3"
            padding={3}
            textAlign={"center"}
            textTransform={"uppercase"}
          >
            Sign In
          </Typography>
          <TextField
            placeholder="Email"
            name="email"
            margin="normal"
            type="email"
            fullWidth
            required
            value={input.email}
            onChange={handleChange}
          />
          <TextField
            placeholder="Password"
            name="password"
            margin="normal"
            type="password"
            fullWidth
            required
            value={input.password}
            onChange={handleChange}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ borderRadius: 3, marginTop: 2, marginBottom: 3 }}
          >
            LogIn
          </Button>
          <p>
            New user?
            <Button onClick={() => navigate("/register")}>Sign Up</Button>
          </p>
        </Box>
      </form>
    </>
  );
};

export default Signin;
