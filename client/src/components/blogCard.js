import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function BlogCard({ title, description, time, username, id }) {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/blog-details/${id}`);
  };

  const handleDelete = async () => {
    try {
      const { data } = await axios.delete(`/api/v1/blogs/delete-blog/${id}`);
      if (data?.success) {
        alert("Blog deleted successfully...");
        window.location.reload();
        // navigate("/all-blogs");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card
      sx={{
        width: "70%",
        margin: "auto",
        marginTop: 5,
        padding: 2,
        boxShadow: "1px 1px 10px grey",
        ":hover:": {
          boxShadow: "5px 5px 20px grey",
        },
      }}
    >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            O_O
          </Avatar>
        }
        title={username}
        subheader={time}
        action={
          <Box display={"flex"}>
            <IconButton onClick={handleEdit} sx={{ marginLeft: "auto" }}>
              <EditIcon />
            </IconButton>
            <IconButton onClick={handleDelete}>
              <DeleteIcon />
            </IconButton>
          </Box>
        }
      />

      <CardContent>
        <Typography variant="h5" color="black">
          {title}
        </Typography>
        <Typography variant="body" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
}
