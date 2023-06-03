import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";

export default function BlogCard({ title, description, time, username }) {
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
