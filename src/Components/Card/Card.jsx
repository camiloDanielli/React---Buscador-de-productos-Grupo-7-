import {
  Card as CardMui,
  CardMedia,
  CardContent,
  Typography,
} from "@mui/material";
import React from "react";

const Card = ({ name, image, description, price }) => {
  return (
    <CardMui>
      <CardMedia component="img" height="340" image={image} alt={name} />
      <CardContent>
        <Typography variant="h5">{name}</Typography>
        <Typography variant="body2">{description}</Typography>
        <Typography variant="body1">${price}</Typography>
      </CardContent>
    </CardMui>
  );
};

export default Card;
