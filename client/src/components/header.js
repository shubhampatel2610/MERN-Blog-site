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
import { Link } from "react-router-dom";

const Header = () => {
  const { value, setValue } = useState();
  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h4">BlogItNow.com</Typography>
          <Box display={"flex"} marginLeft={"auto"} marginRight={"auto"}>
            <Tabs
              textColor="inherit"
              value={value}
              onChange={(event, value) => setValue(value)}
            >
              <Tab label="All Blogs" LinkComponent={Link} to="/blogs" />
              <Tab label="My Blogs" LinkComponent={Link} to="/my-blogs" />
            </Tabs>
          </Box>
          <Box display={"flex"} marginLeft={"auto"}>
            <Button
              sx={{ margin: 1, color: "white" }}
              LinkComponent={Link}
              to="/signin"
            >
              Sign-In
            </Button>
            <Button
              sx={{ margin: 1, color: "white" }}
              LinkComponent={Link}
              to="/signup"
            >
              Sign-Up
            </Button>
            <Button sx={{ margin: 1, color: "white" }}>Sign-Out</Button>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
