import React, { useState } from "react";
import {
  Box,
  AppBar,
  Toolbar,
  Button,
  Typography,
  Tabs,
  Tab,
} from "@mui/material";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../redux/store";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // global states
  const isLogin = useSelector((state) => state.isLogin);

  // states
  const { value, setValue } = useState();

  // handle sign out button
  const handleSignOut = () => {
    try {
      dispatch(authActions.logout());
      alert("User signed out successfully...");
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h4">BlogItNow.com</Typography>
          {isLogin && (
            <Box display={"flex"} marginLeft={"auto"} marginRight={"auto"}>
              <Tabs
                textColor="inherit"
                value={value}
                onChange={(event, value) => setValue(value)}
              >
                <Tab label="Blogs" LinkComponent={Link} to="/blogs" />
                <Tab label="Create" LinkComponent={Link} to="/create-blog" />
                {/* <Tab label="All Blogs" LinkComponent={Link} to="/blogs" />
                <Tab label="My Blogs" LinkComponent={Link} to="/my-blogs" /> */}
              </Tabs>
            </Box>
          )}
          <Box display={"flex"} marginLeft={"auto"}>
            {!isLogin && (
              <>
                <Button
                  sx={{ margin: 1, color: "white" }}
                  LinkComponent={Link}
                  to="/login"
                >
                  Sign-In
                </Button>
                {/* <Button
                  sx={{ margin: 1, color: "white" }}
                  LinkComponent={Link}
                  to="/register"
                >
                  Sign-Up
                </Button> */}
              </>
            )}
            {isLogin && (
              <Button
                onClick={handleSignOut}
                sx={{ margin: 1, color: "white" }}
              >
                Sign-Out
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
